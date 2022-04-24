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
		'0x43814690e1A79300b680cD84D37bf226e4EFcE96'
	 );	 
	 isInitialized = true;
	 return isInitialized;
}

export const getOwner = async (tokenNo) => {
	if (!isInitialized) {
		await init();
	}
	return KGFTokenContract.methods.ownerOf(tokenNo).call();	
};

export const getOwnBalance = async (account) => {
	if (!isInitialized) {
		await init();
	}
	return KGFTokenContract.methods.balanceOf(account).call();
};

export const mintToken = async (uri) => {
	if (!isInitialized) {
		await init();
	}
	console.log(uri);
	return KGFTokenContract.methods
	.mint(uri)
	.send({ from: selectedAccount });
};

export const addToWhiteList = async (addr) => {
	if (!isInitialized) {
		await init();
	}	
	return KGFTokenContract.methods
	.addToWhiteList(addr)
	.send({ from: selectedAccount });
};

export const getWhiteListStatus = async (whiteListAddr) => {
	if (!isInitialized) {
		await init();
	}
	console.log(KGFTokenContract.methods.whiteList(whiteListAddr).call());
	return KGFTokenContract.methods.whiteList(whiteListAddr).call();
};

