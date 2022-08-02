import { ethers } from "hardhat";

async function main() {
  const domainContract = await ethers.getContract("Domains");

  const record = "Haha my bbx domain"
  let tx = await domainContract.register("rowdy", {
    value: ethers.utils.parseEther("0.1"),
  });
  await tx.wait();

  console.log("Minted domain rowdy.bbx");

  tx = await domainContract.setRecord("rowdy", record);
  await tx.wait();
  console.log("Set record for domain rowdy.bbx");

  const address = await domainContract.getAddress("rowdy");
  console.log("Owner of domain rowdy:", address);

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
