//import { ethers } from 'ethers';
import React, {useEffect,useState } from 'react'
//import Web3 from 'web3'
import { init, getOwnBalance, getOwner, mintToken, addToWhiteList, getWhiteListStatus } from './Web3Client.js';
//const axios = require('axios');
import  'bulma/css/bulma.css'
import './app.css' ;
import AdeeraImage from './KGF-Images/Sanjay-KGF-Adheera.PNG' ;
import RockingStarImage from './KGF-Images/Yash-KGF-RockingStar.PNG' ;
let imgs = [
  "https://ipfs.io/ipfs/QmZmiynTcYr97PMgcvMnGoMFUJ8tyNabd292v6zCJYs1F2/Sanjay-KGF-Adheera.PNG",
  "https://ipfs.io/ipfs/QmZmiynTcYr97PMgcvMnGoMFUJ8tyNabd292v6zCJYs1F2/Yash-KGF-RockingStar.PNG"
];


function App() {

const [balance, setBalance] = useState("-");
const [Owner, setOwner] = useState("-");
const [minted, setMinted] = useState(false);
const [whiteListed, setwhiteListed] = useState(false);
const [whiteListStatus, setwhiteListStatus] = useState("-");
const [Connected, setConnected] = useState("Connect Metamask");
const [balanceAddress, setbalanceAddress] = useState("-");
const [whiteListAddress, setwhiteListAddress] = useState("-");
const [add2whiteListAddress, setadd2whiteListAddress] = useState("-");
const [tokenNo, settokenNo] = useState("-");
const RockingStar = "https://ipfs.io/ipfs/Qmc886HxbY4pKPagX9PcXrWsAF8Zxta8PtH38ycMjQJjV8/RockingStar.json";
const Adheera = "https://ipfs.io/ipfs/Qmc886HxbY4pKPagX9PcXrWsAF8Zxta8PtH38ycMjQJjV8/Adheera.json";
    const fetchBalance = (account) => {
      console.log("@fetchBalance")
      getOwnBalance(account)
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

    const fetchOwner = (tokenNo) => {
      console.log("@fetchOwner")
      getOwner(tokenNo)
        .then((result) => {
          setOwner(result);
        })
        .catch((err) => {
          console.log(err);
          setOwner(err.message);
        });
    };

    const fetchWhiteListStatus = (whiteListAddr) => {
      console.log("@getWhiteListStatus");
      getWhiteListStatus(whiteListAddr)
        .then((result) => {          
          if(result){
            setwhiteListStatus("White-Listed");
          }
          else{
            setwhiteListStatus("Not White-Listed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const mint = (uri) => {
          mintToken(uri)
            .then((tx) => {
              console.log(tx);
              setMinted(true);
            })
            .catch((err) => {
              console.log(err);
            });
	  };
    const add2WhiteList = (addr) => {
      addToWhiteList(addr)
        .then((tx) => {
          console.log(tx);
          setwhiteListed(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleBalanceAddress = (evt) =>{
      setbalanceAddress(evt.target.value);
    };
    const handleWhiteListAddress = (evt) =>{
      setwhiteListAddress(evt.target.value);
    };
    const handleAdd2WhiteListAddress = (evt) =>{
      setadd2whiteListAddress(evt.target.value);
    };
    const handleTokenNo = (evt) =>{
      settokenNo(evt.target.value);
    };

  return (
    <div className="App">
          <nav className="navbar">            
                  <div className ="navbar-right">
                    <h1 className='navbar-item'>ERC-721 NFT Mint</h1>
                  </div> 
          </nav>
          <div className = "navbar-menu">
                <button onClick={connectMM}className='button is-primary is-rounded'>{Connected}</button>
          </div>
          <div className='sidebar'>
              <button onClick={() => fetchBalance(balanceAddress)}className='button is-primary is-right is-rounded'>
                Get Balance
              </button>
              <input  type="text" placeholder='Your Address' 
                onChange={evt => handleBalanceAddress(evt)}>
              </input>
              <div>
              <p>Balance is : {balance}</p>
              </div>
          </div>
          <div className='sidebar'>
              <button onClick={() => fetchWhiteListStatus(whiteListAddress)}className='button is-primary is-right is-rounded'>
                Get WhiteList Status
              </button>
              <input  type="text" placeholder='Your Address' 
                onChange={evt => handleWhiteListAddress(evt)}>
              </input>
              <div>
              <p>WhiteList Status is :  {whiteListStatus}</p>
              </div>
          </div>
          <div className='sidebar'>
              <button onClick={() => add2WhiteList(add2whiteListAddress)}className='button is-primary is-right is-rounded'>
                Add 2 WhiteList
              </button>
              <input  type="text" placeholder='Your Address' 
                onChange={evt => handleAdd2WhiteListAddress(evt)}>
              </input>
              <div>
              <p> {add2whiteListAddress} will be added to Whitelist</p>
              </div>
          </div>
          <div className='sidebar'>
              <button onClick={() => fetchOwner(tokenNo)}className='button is-primary is-right is-rounded'>
              getOwner
              </button>
              <input  type="text" placeholder='Token #' 
                onChange={evt => handleTokenNo(evt)}>
              </input>
              <div>
              <p> Owner of token # { tokenNo } is { Owner }</p>
              </div>
          </div>
          <div>
            <img src={AdeeraImage} height={200} width={200}/>
          </div>
          {!minted ? (
          <button onClick={() => mint(Adheera)}className='button is-primary is-right is-rounded'>
           Mint
          </button>
          ) : (
          <p>Token minted successfully!</p>
          )}
    </div>
  );
}

export default App;