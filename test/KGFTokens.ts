const { expect,assert } = require("chai");
const { ethers } = require("hardhat");


describe("KGFTokens", function () {

  let NFTInstance: any;
  let NFT;
  let adminUser: any, userOne: any, userTwo: any;


      beforeEach(async function () {

        [adminUser, userOne, userTwo] = await ethers.getSigners();
        NFT = await ethers.getContractFactory('KGFTokens');
        NFTInstance = await NFT.deploy();    

      });

      it("KGF Contract Initiated", async function () {        
        console.log("KGF Contract Initiated @ : "+ NFTInstance.address );
        console.log("Admin Address : "+ adminUser.address);
        const deployedBy = await NFTInstance.owner();
        console.log("Deployed By: "+ deployedBy);
      });

      it("Name & Symbol", async function () {        
        const name = await NFTInstance.name();
        const symbol = await NFTInstance.symbol();
        expect(name).to.equal('KGFTokens')
        expect(symbol).to.equal('KGF')
        console.log("Name of the token: "+ name);
        console.log("Symbol of the token: "+ symbol);
      });

      it('Token balance of adminUser without mint', async () => {
        const token0Bal = await NFTInstance.balanceOf(adminUser.address);        
        console.log("Token balance of adminUser :"+token0Bal);
        expect(token0Bal).to.equal(0);
      });

      it('Mint Token', async () => {
        const tokenURI = 'https://ipfs.io/ipfs/QmNNPkcVbpzuAxzzb1FSFFA5p8ezqTuJUNKBExqykVD49y/Adheera.json';
        await NFTInstance.mint(tokenURI);
        const token1Bal = await NFTInstance.balanceOf(adminUser.address);
        expect(token1Bal).to.equal(1);
        console.log("Token balance of adminUser :"+token1Bal);
        const owenr1 = await NFTInstance.ownerOf(1);
        expect(owenr1).to.equal(adminUser.address);
        console.log("Owner of token-1 :"+owenr1);
        const getTokenURI = await NFTInstance.tokenURI(1);
        expect(getTokenURI).to.equal(tokenURI);
        console.log("tokenURI of token-1 :"+getTokenURI);
      });

      it('Approve Token', async () => {
        const tokenURI = 'https://ipfs.io/ipfs/QmNNPkcVbpzuAxzzb1FSFFA5p8ezqTuJUNKBExqykVD49y/Adheera.json';
        await NFTInstance.mint(tokenURI);
        await NFTInstance.approve(userOne.address,1);
        console.log("userOne address :"+userOne.address)
        const addr = await NFTInstance.getApproved(1);
        console.log("appeoved address for token-1 :"+addr)
        expect(addr).to.equal(userOne.address);

      });

      it('TransferFrom', async () => {
        const tokenURI = 'https://ipfs.io/ipfs/QmNNPkcVbpzuAxzzb1FSFFA5p8ezqTuJUNKBExqykVD49y/Adheera.json';
        await NFTInstance.mint(tokenURI);
        await NFTInstance.approve(userOne.address,1);
        await NFTInstance.connect(userOne).transferFrom(adminUser.address,userTwo.address,1);
        console.log("userTwo address :"+userTwo.address);
        const owenr1 = await NFTInstance.ownerOf(1);
        expect(owenr1).to.equal(userTwo.address);
        console.log("Owner of token-1 :"+owenr1);

      });

      it('Mint : UserOne: without whitelist', async () => {
        const tokenURI = 'https://ipfs.io/ipfs/QmNNPkcVbpzuAxzzb1FSFFA5p8ezqTuJUNKBExqykVD49y/Adheera.json';
         await expect(
          NFTInstance.connect(userOne).mint(tokenURI)
        ).to.be.revertedWith("not whitelist memebr");
      });

      it('Mint : UserOne: with whitelist', async () => {
        const tokenURI = 'https://ipfs.io/ipfs/QmNNPkcVbpzuAxzzb1FSFFA5p8ezqTuJUNKBExqykVD49y/Adheera.json';
        await NFTInstance.addToWhiteList(userOne.address);
        await NFTInstance.connect(userOne).mint(tokenURI);

        const owenr1 = await NFTInstance.ownerOf(1);
        expect(owenr1).to.equal(userOne.address);
        console.log("Owner of token-1 :"+owenr1);
      });
});

