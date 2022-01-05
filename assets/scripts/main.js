/* Moralis init code */
const serverUrl = "https://rg0q7tsjvbyd.usemoralis.com:2053/server";//"https://sesnlhpr4cnq.usemoralis.com:2053/server";
const appId = "M9fO7yfe79T1MkSsydlzIA6rjlmFXnziPOD8NhZ9";//"bsUAGijmSlbhkcN8Wo3st1KW332PBMR4CVT9plm6";
Moralis.start({ serverUrl, appId });
const CONTRACT_ADDRESS="0x9fBF2daf724725b6F1c6E3e1F3A8F555b20C3115";
const CONTRACT_URL = `https://rinkeby.etherscan.io/address/${CONTRACT_ADDRESS}`;

let currentUser;

setInterval(fetchContractData(), 30000);

/* Authentication code */
async function login() {
  await Moralis.authenticate()
    .then(async (user) => {
      currentUser = user;
      fetchContractData();
    })
    .catch((error) => {
      console(error);
    });
}

async function fetchContractData() {
    if (currentUser) {
      await mintpass_totalSupply();
      await mintpass_price();
      await mintpass_remainingTokens();
      
      if (web3Contract) {
      	document.getElementById("contractInfos").style.display = "block";
        document.getElementById("submit_mint").style.display = "inline-block";
        document.getElementById("login").style.display = "none";
      }
	} else {
      document.getElementById("contractInfos").style.display = "none";
      document.getElementById("submit_mint").style.display = "none";
      document.getElementById("login").style.display = "inline-block";
    }
}

async function initializeApp() {
	currentUser = Moralis.User.current();
  	if (!currentUser) {
    	login();
    } else {
      fetchContractData();
    }
}

initializeApp();
document.getElementById("login").onclick = login;