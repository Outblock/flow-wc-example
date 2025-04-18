import axios, { AxiosInstance } from "axios";

export type RpcProvidersByChainId = Record<
  number,
  {
    name: string;
    baseURL: string;
    token: {
      name: string;
      symbol: string;
    };
  }
>;

const WALLETCONNECT_RPC_BASE_URL = `https://rpc.walletconnect.com/v1?projectId=${process.env.NEXT_PUBLIC_PROJECT_ID}`;

export const rpcProvidersByChainId: RpcProvidersByChainId = {
  1: {
    name: "Ethereum Mainnet",
    baseURL: WALLETCONNECT_RPC_BASE_URL + "&chainId=eip155:1",
    token: {
      name: "Ether",
      symbol: "ETH",
    },
  },
  747: {
    name: "Flow Mainnet",
    baseURL: WALLETCONNECT_RPC_BASE_URL + "&chainId=eip155:747",
    token: {
      name: "Flow",
      symbol: "FLOW",
    },
  },
  545: {
    name: "Flow Testnet",
    baseURL: WALLETCONNECT_RPC_BASE_URL + "&chainId=eip155:545",
    token: {
      name: "Flow",
      symbol: "FLOW",
    },
  },
};

const api: AxiosInstance = axios.create({
  baseURL: "https://rpc.walletconnect.com/v1",
  timeout: 10000, // 10 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const apiGetAccountNonce = async (address: string, chainId: string): Promise<number> => {
  const ethChainId = chainId.split(":")[1];
  const { baseURL } = rpcProvidersByChainId[Number(ethChainId)];
  const response = await api.post(baseURL, {
    jsonrpc: "2.0",
    method: "eth_getTransactionCount",
    params: [address, "latest"],
    id: 1,
  });
  const { result } = response.data;
  const nonce = parseInt(result, 16);
  return nonce;
};

export const apiGetGasPrice = async (chainId: string): Promise<string> => {
  const ethChainId = chainId.split(":")[1];
  const { baseURL } = rpcProvidersByChainId[Number(ethChainId)];
  const response = await api.post(baseURL, {
    jsonrpc: "2.0",
    method: "eth_gasPrice",
    params: [],
    id: 1,
  });
  const { result } = response.data;
  return result;
};
