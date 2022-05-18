import { ethers } from "ethers";
import { contractAbi, contractAdderess } from "../utils/constants";

export const getMarketStorageContract = (
  provider: ethers.providers.Web3Provider
) => {
  const signer = provider.getSigner();
  return new ethers.Contract(contractAdderess, contractAbi, signer);
};
