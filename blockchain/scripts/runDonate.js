const main = async () => {
  const donateContractFactory = await hre.ethers.getContractFactory("Donate");
  const donateContract = await donateContractFactory.deploy();

  await donateContract.deployed();
  console.log("Contract addy:", donateContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    donateContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two donate now
   */
  const donateTxn = await donateContract.donate({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await donateTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    donateContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  //  let allDonations = await donateContract.getallDonations();
  //   console.log(allDonations);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
