import CryptoJS from "crypto-js";

let main = ()=>{
    let jwtsignToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmTmFtZSI6ImhhbnphbGEiLCJhZ2UiOjIxLCJpYXQiOjE2OTg0ODc3NjQsImV4cCI6MTY5ODQ4NzgyNH0.e8w_WkgDx3c-gDVbo6W-hFKukhGnrvHli-YwRLegDYc"
    let cryptoKey="SPACEX"

    //Encryption 
    let encrypt=CryptoJS.AES.encrypt(jwtsignToken,cryptoKey).toString();
    console.log(encrypt);
    console.log("\n");
    
    
    //Decryption
    let decrypt =CryptoJS.AES.decrypt(encrypt,cryptoKey);
    const originalText=decrypt.toString(CryptoJS.enc.Utf8);
    console.log(originalText);
    
}

main();