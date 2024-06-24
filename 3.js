const Web3 = require("web3");
const { get, post } = require("axios");

const account = Web3.eth.accounts.create();

// Example keys for demonstration (replace with your own keys)
const privateKey = '0x0bfa1813246238459ae1fe52a760576ba6e86fd2907fddb490e5bc14312dcc25';
const publicKey = '0x556E4e221200C334e8a6cCA882e3a0f3E0Dc13eE';
const apiKey = '3fefe855-e97b-4cbb-ac48-5d61795204e3';
const myH2kApiUrl = 'http://my.h2k.me/api';

// Function to sign data using private key
async function signData(data) {
    const sign = await Web3.eth.accounts.sign(JSON.stringify(data), privateKey);
    return {
        'x-app-ec-from': publicKey,
        'x-app-ec-sign-r': sign.r,
        'x-app-ec-sign-s': sign.s,
        'x-app-ec-sign-v': sign.v,
        'Content-Type': 'application/json'
    };
}

// Function to create a wallet
async function createWallet(networkId, email) {
    const data = {
        slist: {
            min_signs: "1",
            0: { type: "all", email: email },
        },
        network: networkId,
        info: "Мой первый кошелёк"
    };
    const headers = await signData(data);

    try {
        const response = await post(`${myH2kApiUrl}/newWallet`, data, { headers: headers });
        console.log('Wallet Created:', response.data);
    } catch (error) {
        console.error('Error creating wallet:', error.response ? error.response.data : error.message);
    }
}

// Function to get wallet data from Trongrid/Tronscan
async function getWalletData(walletAddress) {
    const headers = {
        'TRON-PRO-API-KEY': apiKey,
        'Content-Type': 'application/json'
    };

    try {
        const balanceResponse = await get(`https://api.trongrid.io/v1/accounts/${walletAddress}`, { headers: headers });
        const transactionsResponse = await get(`https://api.trongrid.io/v1/accounts/${walletAddress}/transactions/trc20`, { headers: headers });

        console.log('Balances:', balanceResponse.data);
        console.log('Transactions:', transactionsResponse.data);
    } catch (error) {
        console.error('Error fetching wallet data:', error.response ? error.response.data : error.message);
    }
}

// Function to check tokens
async function checkTokens(walletAddress) {
    const headers = {
        'TRON-PRO-API-KEY': apiKey,
        'Content-Type': 'application/json'
    };

    try {
        const response = await get(`https://api.trongrid.io/v1/accounts/${walletAddress}/tokens`, { headers: headers });
        console.log('Tokens:', response.data);
    } catch (error) {
        console.error('Error checking tokens:', error.response ? error.response.data : error.message);
    }
}

// Function to make a transaction
async function makeTransaction(walletAddress, toAddress, amount) {
    const data = {
        token: `5010:::TRX###${walletAddress}`,
        info: "Test Transaction",
        value: amount,
        toAddress: toAddress
    };
    const headers = await signData(data);

    try {
        const response = await post(`${myH2kApiUrl}/tx`, data, { headers: headers });
        console.log('Transaction Successful:', response.data);
    } catch (error) {
        console.error('Error making transaction:', error.response ? error.response.data : error.message);
    }
}

(async function testAPI() {
    // Example Usage
    const networkId = '5010'; // Example network ID, replace with actual network ID
    const email = 'example@example.com'; // Replace with actual email
    const walletAddress = 'YOUR_WALLET_ADDRESS_HERE'; // Replace with actual wallet address
    const toAddress = 'TRx6xXChS5sXz3mpvLSNfKuL6w3PBdMZzL'; // Replace with actual recipient address
    const amount = '1.01'; // Replace with actual amount

    // Uncomment the necessary lines to perform different operations:

    // Create a wallet
    // await createWallet(networkId, email);

    // Get wallet data
    // await getWalletData(walletAddress);

    // Check tokens
    // await checkTokens(walletAddress);

    // Make a transaction
    // await makeTransaction(walletAddress, toAddress, amount);
})();
