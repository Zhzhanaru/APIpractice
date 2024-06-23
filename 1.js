const Web3 = require("web3");
const {get, post } = require("axios");

const account = Web3.eth.accounts.create();

//console.log(Private Key: ${account.privateKey});
//console.log(Public Key: ${account.address});

const privateKey='0x0bfa1813246238459ae1fe52a760576ba6e86fd2907fddb490e5bc14312dcc25';
const publicKey='0x556E4e221200C334e8a6cCA882e3a0f3E0Dc13eE';

(async function testAPI() {
    const sign = await Web3.eth.accounts.sign(JSON.stringify({
        
            // token:"5010:::TRX###8E0DE4748F54196546258B3B0026096E",
            // info:"Test Test",
            // value:"1,01",
            // toAddress:"TRx6xXChS5sXz3mpvLSNfKuL6w3PBdMZzL",
        
          
        // slist: {
        //     min_signs:"1",
        //     0:{type:"all", email:"mkleezero@gmail.com"},
        //    },
        // network: "5010",
        // info: "Мой первый кошелёк"
        
          
}), privateKey)
    const headers = {
        'x-app-ec-from': publicKey,
        'x-app-ec-sign-r': sign.r,
        'x-app-ec-sign-s': sign.s,
        'x-app-ec-sign-v': sign.v
    };

    const Data = {
        slist: {
                min_signs:"1",
                0:{type:"all", email:"mkleezero@gmail.com"},
               },
        network: "5010",
        info: "Мой первый кошелёк" 

        // token:"5010:::TRX###8E0DE4748F54196546258B3B0026096E",
        // info:"Test Test",
        // value:"1,01",
        // toAddress:"TRx6xXChS5sXz3mpvLSNfKuL6w3PBdMZzL",
    };
    const response = await get(`https://my.safina.pro/ece/netlist/0`, {headers: headers});

    //const response = await post('https://my.safina.pro/ece/newWallet', Data, {headers: headers});

    //const response = await get(`https://my.safina.pro/ece/wallets`, {headers: headers});
    
    //const response = await get(`https://my.safina.pro/ece/tokens`, {headers: headers});

    //const response = await get(`https://my.safina.pro/ece/walletbyunid/:unid`, {headers: headers});

    // const response = await post('https://my.safina.pro/ece/tx', Data, {headers: headers});
   
    // const response = await get('https://my.safina.pro/ece/wallet_tokens/8E0DE4748F54196546258B3B0026096E', {headers: headers});
    
    console.log(response.data);
})()
