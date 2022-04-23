//import Web3 from 'web3';

import Web3 from "web3";
import KGFTokenArtifacts from './artifacts/contracts/KGFTokens.sol/KGFTokens.json';

let selectedAccount;
let newChain;
let KGFTokenContract;
let isInitialized = false;

export const init = async () => {
	let provider = window.ethereum;

	if (typeof provider !== 'undefined') {
		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			//console.log(`Selected account changed to ${selectedAccount}`);
		});
        window.ethereum.on('chainChanged', function (chainChanged) {
			newChain = chainChanged[0];
			//console.log(`Selected chain changed to ${newChain}`);
		});
	}
  	 const web3 = new Web3(provider);	
	 const networkId = await web3.eth.net.getId();
	 //console.log(`networkId ${networkId}`);
	 //console.log('contract Name from artifcats:', KGFTokenArtifacts.contractName);
	 KGFTokenContract = new web3.eth.Contract(
		KGFTokenArtifacts.abi,
		'0xf56a9F1420B09d0Ee4c5c90e2312609fD27299bE'
	 );	 
	 isInitialized = true;
	 return isInitialized;
}

export const getOwner = async () => {
	if (!isInitialized) {
		await init();
	}
	return KGFTokenContract.methods.ownerOf(1).call();
};
export const getOwnBalance = async () => {
	if (!isInitialized) {
		await init();
	}
	return KGFTokenContract.methods.balanceOf(selectedAccount).call();
};

export const mintToken = async () => {
	if (!isInitialized) {
		await init();
	}
	return KGFTokenContract.methods
	.mint("https://ipfs.io/ipfs/QmNoanNDrKZ9NyBL5HtDipYsn821PS5Z3XYuV9iTuuxVVi")
	.send({ from: selectedAccount });
};

export const addToWhiteList = async () => {
	if (!isInitialized) {
		await init();
	}
	const addr = '0x38805F72EbcAfB924e8b5cED9F8D575Fe8039E0e';
	return KGFTokenContract.methods
	.addToWhiteList(addr)
	.send({ from: selectedAccount });
};

export const getWhiteListStatus = async () => {
	if (!isInitialized) {
		await init();
	}
	const addr = '0x38805F72EbcAfB924e8b5cED9F8D575Fe8039E0e';
	console.log(KGFTokenContract.methods.whiteList(addr).call());
	return KGFTokenContract.methods.whiteList(addr).call();
};

