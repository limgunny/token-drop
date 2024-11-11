"use client";
import React, { useState } from "react";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { CONTRACT } from "@/app/constants";
import { formatNumber } from "@/lib/utils";

export default function Transfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");
  const account = useActiveAccount();
  const { data: balance } = useReadContract({
    contract: CONTRACT,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [account?.address ?? ""],
  });
  const { data: symbol } = useReadContract({
    contract: CONTRACT,
    method: "function symbol() view returns (string)",
    params: [],
  });
  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!CONTRACT || !account) {
      setError("Contract or account not available");
      return;
    }
    setIsLoading(true);
    setError("");
    setTransactionHash("");
    try {
      const transaction = await prepareContractCall({
        contract: CONTRACT,
        method: "function transfer(address to, uint256 amount) returns (bool)",
        params: [recipient, BigInt(Math.floor(parseFloat(amount) * 1e18))],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      setTransactionHash(transactionHash);
    } catch (err) {
      console.error("Transfer error:", err);
      setError("Transfer failed. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-4 p-4 bg-gray-300 rounded-lg text-gray-800 ">
            <h2 className="text-2xl font-bold mb-4"> Token Transfer </h2>
      <p className="mb-2">
        Your Balance: {`${formatNumber(balance)}` || "Loading..."}
        {symbol}
      </p>
      <form onSubmit={handleTransfer} className="space-y-2">
        <div>
          <label htmlFor="recipient" className="block">
            Recipient Address:
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min="0"
            step="1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Transfer"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {transactionHash && (
        <p className="mt-4 text-green-500">
          Transaction successful! Hash: {transactionHash}
        </p>
      )}
    </div>
  );
}
