const { ethereum } = window;

export const connectWallet = async () => {
  try {
    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};

export const checkIfWalletIsConnected = async () => {
  try {
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Authorized", account);
      return account;
    } else {
      console.log("No authorized account found");
    }
  } catch (error) {
    console.log(error);
  }
};
