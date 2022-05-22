import { ethers } from "ethers";
import waveAbi from "./../utils/WavePortal.json";

const waveContractAddress = "0x29CF59663fa74926A4A477A5ad0321aa5524F22D";
export const waveContractABI = waveAbi.abi;

const { ethereum } = window;

export const waveContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(waveContractAddress, waveContractABI, signer);
};

export const getTotalWaves = async (setTotalWaves: any) => {
  try {
    if (ethereum) {
      const wavePortalContract = waveContract();

      let count = await wavePortalContract.getTotalWaves();
      setTotalWaves(count.toNumber());
    }
  } catch (error) {
    console.log(error);
  }
};

export const wave = async (
  setIsLoading: (bool: boolean) => void,
  message: string,
  setMessage: (msg: string) => void
) => {
  try {
    if (ethereum) {
      setIsLoading(true);
      const wavePortalContract = waveContract();

      let count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      const waveTxn = await wavePortalContract.wave(message, {
        gasLimit: 300000,
      });
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      if (count.toNumber()) {
        setIsLoading(false);
        setMessage("");
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
};
