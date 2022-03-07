
const hre = require("hardhat");
const { owner } = require("../secrets.json");

async function main() {
 
  const WMATIC = await hre.ethers.getContractFactory("WMATIC");
  const wmatic = await WMATIC.deploy("WMATIC","WMATIC");

  await wmatic.deployed();

  console.log("wmatic deployed to:", wmatic.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
