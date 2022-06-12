const ethers = require("ethers");
const fs = require("fs-extra");
require('dotenv').config();

async function main() {
    // http://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider(process.env.LocalProvider);
    console.log('Waiting for network')
    const network = await provider.detectNetwork()
    console.log(network)

    // const wallet = new ethers.Wallet(
    //     process.env.PrivateKey,
    //     provider
    // );

    const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");

    let wallet = new ethers.Wallet.fromEncryptedJsonSync(
        encryptedJson,
        process.env.PRIVATE_KEY_PASSWORD
    );

    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf8"
    );
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    );

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);


    console.log(currentFavouriteNumber.toString());
    const transactionResponse = await contract.store("652");
    const currentFavouriteNumber = await contract.retrieve();
    console.log(currentFavouriteNumber.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });