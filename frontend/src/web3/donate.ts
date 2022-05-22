import { ethers } from "ethers";
import donateAbi from "../utils/Donate.json";

const donateContractAddress = "0xbc80Fa4B52d4efe5dDD8D3b26d34029579C4FBb2";
const donateContractABI = donateAbi.abi;

const { ethereum } = window;

export const donate = async (value: any) => {
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const donateContract = new ethers.Contract(
        donateContractAddress,
        donateContractABI,
        signer
      );

      let donation = await donateContract.donate({
        value,
      });

      return donation;
    }
  } catch (error) {
    return null;
  }
};

export const getBalance = async () => {
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const donateContract = new ethers.Contract(
        donateContractAddress,
        donateContractABI,
        signer
      );

      let balance = await donateContract.getBalance();
      console.log("balance", balance.toNumber());
    }
  } catch (error) {
    console.log(error);
  }
};
