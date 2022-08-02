import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { Contract, Signer } from "ethers";

describe("Domains", function () {
  let domainContract: Contract;
  let deployer: Signer;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    await deployments.fixture(["all"]);
    domainContract = await ethers.getContract("Domains")
  });

  it("Should be able to create a domain", async () => {
    const tx = await domainContract.register("doom");
    await tx.wait();
    expect(await domainContract.getAddress("doom")).equals(await deployer.getAddress());
  });

  it("Should be able to add a new record", async () => {
    const record = "Haha my bbx domain"
    let tx = await domainContract.register("doom");
    await tx.wait();
    tx = await domainContract.setRecord("doom", record);
    await tx.wait();
    expect(await domainContract.getRecord("doom")).equals(record);
  })
});
