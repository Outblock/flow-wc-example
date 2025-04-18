import { JsonRpcRequest } from "@walletconnect/jsonrpc-utils";

import {
  NamespaceMetadata,
  ChainMetadata,
  ChainRequestRender,
  convertHexToNumber,
  convertHexToUtf8,
} from "../helpers";

export const EIP155Colors = {
  flow: "0, 219, 128", // #00DB80
  ethereum: "99, 125, 234", // blue
};

export const EIP155ChainData = {
  "747": {
    name: "Flow Mainnet",
    id: "eip155:747",
    rpc: ["https://mainnet.evm.nodes.onflow.org"],
    slip44: 747,
    testnet: false,
  },
  "545": {
    name: "Flow Testnet",
    id: "eip155:545",
    rpc: ["https://testnet.evm.nodes.onflow.org"],
    slip44: 545,
    testnet: true,
  },
};

export const EIP155Metadata: NamespaceMetadata = {
  "747": {
    name: "Flow",
    logo: "https://raw.githubusercontent.com/Outblock/Assets/refs/heads/main/ft/flow/logo.svg",
    rgb: EIP155Colors.flow,
  },
  "545": {
    name: "Flow Testnet",
    logo: "https://raw.githubusercontent.com/Outblock/Assets/refs/heads/main/ft/flow/logo.svg",
    rgb: EIP155Colors.flow,
  },
};

export function getChainMetadata(chainId: string): ChainMetadata {
  const reference = chainId.split(":")[1];
  const metadata = EIP155Metadata[reference];
  if (typeof metadata === "undefined") {
    throw new Error(`No chain metadata found for chainId: ${chainId}`);
  }
  return metadata;
}

export function getChainRequestRender(request: JsonRpcRequest): ChainRequestRender[] {
  let params = [{ label: "Method", value: request.method }];

  switch (request.method) {
    case "eth_sendTransaction":
    case "eth_signTransaction":
      params = [
        ...params,
        { label: "From", value: request.params[0].from },
        { label: "To", value: request.params[0].to },
        {
          label: "Gas Limit",
          value: request.params[0].gas
            ? convertHexToNumber(request.params[0].gas)
            : request.params[0].gasLimit
            ? convertHexToNumber(request.params[0].gasLimit)
            : "",
        },
        {
          label: "Gas Price",
          value: convertHexToNumber(request.params[0].gasPrice),
        },
        {
          label: "Nonce",
          value: convertHexToNumber(request.params[0].nonce),
        },
        {
          label: "Value",
          value: request.params[0].value ? convertHexToNumber(request.params[0].value) : "",
        },
        { label: "Data", value: request.params[0].data },
      ];
      break;

    case "eth_sign":
      params = [
        ...params,
        { label: "Address", value: request.params[0] },
        { label: "Message", value: request.params[1] },
      ];
      break;
    case "personal_sign":
      params = [
        ...params,
        { label: "Address", value: request.params[1] },
        {
          label: "Message",
          value: convertHexToUtf8(request.params[0]),
        },
      ];
      break;
    default:
      params = [
        ...params,
        {
          label: "params",
          value: JSON.stringify(request.params, null, "\t"),
        },
      ];
      break;
  }
  return params;
}
