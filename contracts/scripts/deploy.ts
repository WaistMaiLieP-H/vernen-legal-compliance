import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("═══════════════════════════════════════════════════════════");
  console.log("  Vernen Legal Compliance — Deploying Verification Contract");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`  Deployer:  ${deployer.address}`);
  console.log(`  Balance:   ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH`);
  console.log(`  Network:   ${(await ethers.provider.getNetwork()).name} (${(await ethers.provider.getNetwork()).chainId})`);
  console.log("───────────────────────────────────────────────────────────");

  // Deploy with deployer as both owner and initial verifier
  // The verifier address will be updated to the REGULIS worker wallet later
  const VernenVerification = await ethers.getContractFactory("VernenVerification");
  const contract = await VernenVerification.deploy(deployer.address);
  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("");
  console.log("  ✓ Contract deployed successfully!");
  console.log(`  Address:   ${address}`);
  console.log(`  Owner:     ${deployer.address}`);
  console.log(`  Verifier:  ${deployer.address} (update to REGULIS wallet)`);
  console.log("");
  console.log("  Next steps:");
  console.log(`  1. Verify:  npx hardhat verify --network <network> ${address} ${deployer.address}`);
  console.log(`  2. Set VERIFICATION_CONTRACT_ADDRESS=${address} in wrangler secrets`);
  console.log(`  3. Set CHAIN_PRIVATE_KEY in wrangler secrets`);
  console.log("═══════════════════════════════════════════════════════════");

  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
