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
    const price = ethers.utils.parseEther("0.1");
    const tx = await domainContract.register("rowdy", {
      value: price,
    });
    await tx.wait();
    expect(await domainContract.getAddress("rowdy")).equals(await deployer.getAddress());
    expect(await ethers.provider.getBalance(domainContract.address)).greaterThanOrEqual(price);
  });

  it("Should be able to add a new record", async () => {
    const record = "Haha my bbx domain"
    let tx = await domainContract.register("rowdy", {
      value: ethers.utils.parseEther("0.1"),
    });
    await tx.wait();
    tx = await domainContract.setRecord("rowdy", record);
    await tx.wait();
    expect(await domainContract.getRecord("rowdy")).equals(record);
  })
});
