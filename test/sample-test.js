const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {

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



    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
