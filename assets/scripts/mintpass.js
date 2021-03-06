const mintpassId = 0;
let web3;
let currentMintpassPrice;
let amount = 1;
let web3Contract;
let maxPerWallet = 5;
let balanceOf = 0;
let remainingTokens = 0;

async function mintpassContract() {
  	try {
        if (!web3Contract && currentUser) {
            web3 = await Moralis.enableWeb3();
            web3Contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
            document.getElementById("counter").style.display = "inline-block";
        }
        return web3Contract;
    } catch(error) {
        console.log(error);
        return null;
    }
}

/*** UTILITY FUNCTIONS ***/
async function mintpass_totalSupply(contract) {
  	if (contract !== null) { 
      contract.methods.totalSupply().call()
          .then((res) => {
              document.getElementById("totalSupply").textContent = res;
          });
    }
}

async function mintpass_remainingTokens(contract) {
  	if (contract !== null) { 
      contract.methods.remainingTokens().call()
          .then((res) => {
              remainingTokens = res;
              document.getElementById("remainingTokens").textContent = remainingTokens;
          });
    }
}

async function mintpass_price(contract) {
  	if (contract !== null) { 
      contract.methods.price().call()
          .then((res) => {
              currentMintpassPrice = res;
          });
    }
}

async function mintpass_balanceOf(contract) {
    if (contract !== null) {
        web3 = await Moralis.enableWeb3();
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        contract.methods.balanceOf(accounts[0]).call()
            .then((res) => {
                balanceOf = res;
                if (balanceOf === maxPerWallet) {
                    document.getElementById("submit_mint").style.display = "none";
                    document.getElementById("soldOut").style.display = "none";
                    document.getElementById("limitMax").style.display = "inline-block";
                }
            });
    }
}

async function mintpass_maxAmountPerAddress(contract) {
    if (contract !== null) {
        contract.methods.maxAmountPerAddress().call()
            .then((res) => {
                maxPerWallet = res;
                document.getElementById('maxPerWallet').textContent = maxPerWallet;

                if (balanceOf === maxPerWallet) {
                    document.getElementById("submit_mint").style.display = "none";
                    document.getElementById("soldOut").style.display = "none";
                    document.getElementById("limitMax").style.display = "inline-block";
                }
            });
    }
}

/*** CORE FUNCTIONS ***/
async function mint() {
    currentUser = Moralis.User.current();
    if (!currentUser) {
        await login();
    }

    if (currentUser) {
        document.getElementById("submit_mint").disabled = true;

        try {
            web3 = await Moralis.enableWeb3();
            const accounts = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);

            contract.methods.mint(amount).send({
                from: accounts[0],
                value: currentMintpassPrice * amount
            })
                .then((res) => {
                    console.log(`mint: ${res}`);
                    document.getElementById("submit_mint").disabled = false;
                    fetchContractData();
                }).catch((err) => {
                    console.log(err);
                    document.getElementById("submit_mint").disabled = true;
                });
        } catch (error) {
            console.log(error);
            document.getElementById("submit_mint").disabled = false;
        }
    }
}

document.getElementById("submit_mint").onclick = mint;