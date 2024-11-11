import { getContract } from "thirdweb";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";

export const contractAddress = "0x147311E0B22A5195C635a913d6E7B34bCEA36140";

export const CONTRACT = getContract({
  client: client,
  chain: sepolia,
  address: contractAddress,
});
