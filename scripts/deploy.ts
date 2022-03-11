
const hre = require("hardhat");
const { owner } = require("../secrets.json");

async function main() {
 
  const WMATIC = await hre.ethers.getContractFactory("WMATIC");
  const wmatic = await WMATIC.deploy("WMATIC","WMATIC");

  await wmatic.deployed();

  console.log("wmatic deployed to:", wmatic.address);


  const Funding = await hre.ethers.getContractFactory("Funding");
  const funding = await Funding.deploy(wmatic.address);

  await funding.deployed();

  console.log("funding deployed to:", funding.address);

  const NRT = await hre.ethers.getContractFactory("NRT");
  const nrt = await NRT.deploy(wmatic.address,'PRX',9);

  await nrt.deployed();

  console.log("nrt deployed to:", nrt.address);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
