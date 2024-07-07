// scripts/index.js
(async () => {
    const ethers = await import('ethers');

    // function does not work, either because ether is not installed correctly
    // or that listAccounts is a method in an older etherium version
    async function main () {

        // Retrieve accounts from the local node
        //const provider = new ethers.ethers.providers.JsonRpcProvider("http://localhost:8545");
        //const accounts = await provider.listAccounts();
        //console.log(accounts);

        // Set up an ethers contract, representing our deployed Box instance
        const address = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
        const Box = await ethers.getContractFactory('Box')
        const box = await Box.attach(address);

        // Call the retrieve() function of the deployed Box contract
        const value = await box.retrieve();
        console.log('Box value is', value.toString());

        // Send a transaction to store() a new value in the Box
        await box.store(42);
        value = await box.retrieve();
        console.log('Box value is', value.toString())
    }

    main()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        })    
})();

