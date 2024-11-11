import { CONTRACT } from "@/app/constants";
import { formatNumber } from "@/lib/utils";
import React from "react";
import { getContractMetadata } from "thirdweb/extensions/common";
import { totalSupply } from "thirdweb/extensions/erc20";

export default async function TokenInfo() {
  const contractMetadata = await getContractMetadata({ contract: CONTRACT });
  const total = await totalSupply({ contract: CONTRACT });
  console.log(contractMetadata);
  console.log(total);

  return (
    <div className="mt-4 text-gray-800 p-4 rounded-md bg-slate-300">
      <h1 className="text-2xl font-bold mb-2">Token Info</h1>
      <p>Name: {contractMetadata.name} </p>
      <p>Symbol: {contractMetadata.symbol} </p>
      <p>Description: {contractMetadata.description} </p>
      <p>
        Total Supply: {formatNumber(total)} {contractMetadata.symbol}
      </p>
    </div>
  );
}
