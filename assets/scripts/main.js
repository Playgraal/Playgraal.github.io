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
      await fetchContractData();
    })
    .catch((error) => {
      console.log(error);
    });
}

async function fetchContractData() {
    if (currentUser) {
        await mintpass_totalSupply();
        await mintpass_price();
        await mintpass_remainingTokens();
        await mintpass_maxAmountPerAddress();
        await mintpass_balanceOf();
	}
}

async function initializeApp() {
	currentUser = Moralis.User.current();
    if (!currentUser) {
    	await login();
    } else {
        await fetchContractData();
    }
}

initializeApp();
document.getElementById("counter").style.display = "none";