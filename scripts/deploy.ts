//const { ethers } = require("hardhat");

async function main() {

  const KGFTokens = await ethers.getContractFactory("KGFTokens");
  const dKGFTokens = await KGFTokens.deploy();

  await dKGFTokens.deployed();
  console.log("Success! Contract was deployed to: ",dKGFTokens.address);

  await dKGFTokens.mint("https://ipfs.io/ipfs/Qmc886HxbY4pKPagX9PcXrWsAF8Zxta8PtH38ycMjQJjV8/Adheera.json")

  console.log("NFT successfully minted");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });