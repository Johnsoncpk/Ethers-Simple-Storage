const ethers = require("ethers");
require('dotenv').config()

async function main() {
    // http://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider(process.env.LocalProvider);
    const wallet = new ethers.Wallet(
        process.env.PrivateKey,
        provider
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });