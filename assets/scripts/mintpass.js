const mintpassId = 0;
let web3;
let currentMintpassPrice;
let amount = 1;
let web3Contract;

async function mintpassContract() {
  	try {
      if (!web3Contract) {
        web3 = await Moralis.enableWeb3();
        web3Contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
      }
      return web3Contract;
    } catch(error) {
        console.log(error);
        return null;
    }
}

/*** UTILITY FUNCTIONS ***/
async function mintpass_totalSupply() {
    const contract = await mintpassContract();
    if (contract !== null) {
        try {
            contract.methods.totalSupply().call()
                .then((res) => {
                    console.log('totalSupply: ', res);
                    document.getElementById("totalSupply").textContent = res;
                });
        } catch (error) {
            console.log(error);
        }
    }
}

async function mintpass_mintedTokenCounter() {
    const contract = await mintpassContract();
    if (contract !== null) {
        try {
          contract.methods.mintedTokenCounter().call()
              .then((res) => {
                  console.log('mintedTokenCounter: ', res);
                  document.getElementById("mintedTokenCounter").textContent = res;
              });
        } catch (error) {
            console.log(error);
        }
    }
}

async function mintpass_remainingTokens() {
	const contract = await mintpassContract();
    if (contract !== null) {
        try {
          contract.methods.remainingTokens().call()
              .then((res) => {
                  console.log('mintedTokenCounter: ', res);
                  document.getElementById("mintedTokenCounter").textContent = res;
              });
        } catch (error) {
            console.log(error);
        }
    }
}

async function mintpass_price() {
    const contract = await mintpassContract();
    if (contract !== null) {
        try {
          contract.methods.price().call()
              .then((res) => {
                  console.log('price: ', res);
                  currentMintpassPrice = res;
              });
        } catch (error) {
            console.log(error);
        }
    }
}

/*** CORE FUNCTIONS ***/
async function mint() {
    currentUser = Moralis.User.current();
    if (!currentUser) {
        login();
    }

    document.getElementById("submit_mint").disabled = true;

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
}

document.getElementById("submit_mint").onclick = mint;