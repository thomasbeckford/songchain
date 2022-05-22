import { ethers } from "ethers";
import React, { useEffect } from "react";
import { IWave } from "../types";
import { waveContract } from "../web3/wave";
import { useLocalStorage } from "./../hooks/useLocalStorage";

interface GeneralContextProps {
  setCurrentAccount: (account: string) => void;
  currentAccount: string | null;
  setAllWaves: (waves: IWave[]) => void;
  allWaves: IWave[];
}

export const GeneralContext = React.createContext<GeneralContextProps>({
  setCurrentAccount: () => {},
  currentAccount: null,
  setAllWaves: () => {},
  allWaves: [],
});

export const GeneralProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useLocalStorage(
    "currentAccount",
    null
  );

  const [allWaves, setAllWaves] = useLocalStorage("allWaves", []);

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      setCurrentAccount(accounts[0]);
    });
  }

  const getAllWaves = async () => {
    try {
      if (window.ethereum) {
        const wavePortalContract = waveContract();
        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned: any = [];
        waves.forEach((wave: any) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        setAllWaves(wavesCleaned);

        wavePortalContract.on("NewWave", (from, timestamp, message) => {
          console.log("NewWave", from, timestamp, message);

          setAllWaves((prevState: any) => [
            ...prevState,
            {
              address: from,
              timestamp: new Date(timestamp * 1000),
              message: message,
            },
          ]);
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWaves();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        setCurrentAccount,
        currentAccount,
        setAllWaves,
        allWaves,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
