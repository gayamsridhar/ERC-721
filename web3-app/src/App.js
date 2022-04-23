//import { ethers } from 'ethers';
import React, {useEffect,useState } from 'react'
//import Web3 from 'web3'
import { init, getOwnBalance, getOwner, mintToken, addToWhiteList, getWhiteListStatus } from './Web3Client.js';
//const axios = require('axios');
import  'bulma/css/bulma.css'


function App() {

const [balance, setBalance] = useState(0);
const [owner, setOwner] = useState(0);
const [minted, setMinted] = useState(false);
const [whiteListed, setwhiteListed] = useState(false);
const [whiteListStatus, setwhiteListStatus] = useState(false);
const [Connected, setConnected] = useState("Connect Metamask");
let imgs = [
  'https://ipfs.io/ipfs/QmZmiynTcYr97PMgcvMnGoMFUJ8tyNabd292v6zCJYs1F2/Yash-KGF-Toofan.PNG',
];
    // useEffect( () => { 
    //   //init();
    //   //tokenName();
    //   // ownerOf();
    // }, [])

    const fetchBalance = () => {
      console.log("@fetchBalance")
      getOwnBalance()
        .then((balance) => {
          setBalance(balance);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const connectMM = () => {
      console.log("@connectMM")
      init()
        .then((result) => {
          setConnected("Connected");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchOwner = () => {
      console.log("@fetchOwner")
      getOwner()
        .then((result) => {
          setOwner(result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchWhiteListStatus = () => {
      console.log("@getWhiteListStatus");
      getWhiteListStatus()
        .then((result) => {
          setwhiteListStatus(result);
          console.log("WhiteListStatus",whiteListStatus);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const mint = () => {
          mintToken()
            .then((tx) => {
              console.log(tx);
              setMinted(true);
            })
            .catch((err) => {
              console.log(err);
            });
	  };
    const add2WhiteList = () => {
      addToWhiteList()
        .then((tx) => {
          console.log(tx);
          setwhiteListed(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

  return (
    <div className="App">
        <div className='Token Owner'>
          <nav className="navbar">
            <div className="constainer">
              <div className='="navbar-brand"'>
                <h1>ERC-721 NFT Mint</h1>
              </div>
              <div className='="navbar-start"'>
                <button onClick={connectMM}className='button is-primary'>{Connected}</button>
              </div>
            </div>
          </nav>
          <p>Your balance is {balance}</p>
          <button onClick={() => fetchBalance()}className='button is-primary'>Refresh balance</button>
          <p>WhiteList Status is {whiteListStatus}</p>
          <button onClick={() => fetchWhiteListStatus()}>get WhiteListStatus</button>   
          {!minted ? (
          <button onClick={() => mint()}>Mint token</button>
          ) : (
          <p>Token minted successfully!</p>
          )}
        </div>
    </div>
  );
}

export default App;