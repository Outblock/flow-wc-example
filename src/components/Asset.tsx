import * as React from "react";
import styled from "styled-components";

import Icon from "./Icon";

import { AssetData } from "../helpers";

import eth from "../assets/eth.svg";
import erc20 from "../assets/erc20.svg";

const SAsset = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
const SAssetLeft = styled.div`
  display: flex;
`;

const SAssetName = styled.div`
  display: flex;
  margin-left: 10px;
`;

const SAssetRight = styled.div`
  display: flex;
`;

const SAssetBalance = styled.div`
  display: flex;
`;

const flow = "https://raw.githubusercontent.com/Outblock/Assets/refs/heads/main/ft/flow/logo.svg";

// eslint-disable-next-line
function getAssetIcon(asset: AssetData): JSX.Element {
  if (!!asset.contractAddress) {
    const src = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${asset.contractAddress.toLowerCase()}.png`;
    return <Icon src={src} fallback={erc20} />;
  }
  switch (asset.symbol.toLowerCase()) {
    case "eth":
      return <Icon src={eth} />;
    case "flow":
      return <Icon src={flow} />;
    default:
      return <Icon src={erc20} />;
  }
}

interface AssetProps {
  asset: { symbol: string; balance: string };
}

const Asset = (props: AssetProps) => {
  const { asset } = props;
  return (
    <SAsset {...props}>
      <SAssetLeft>
        {/* {getAssetIcon(asset)} */}
        <SAssetName>{asset.symbol}</SAssetName>
      </SAssetLeft>
      <SAssetRight>
        <SAssetBalance>{`${asset.balance}`}</SAssetBalance>
      </SAssetRight>
    </SAsset>
  );
};

export default Asset;
