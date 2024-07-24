# Quick Start:

## Dependencies:  

The project has many dependencies which it uses. Make your way to the root directory of the project, and use the terminal or other resources to install the dependencies. You can check to see if you have something installed by typing in the respective name and `--version`. Ex:  
`node --version`  

The steps below describe how to download the dependencies. Use the command which best suits your system.  
1. The first is node.js:  
Install [Here](https://nodejs.org/en/download/package-manager).  The version which is used is the v20.15.1 (LTS).  

Once node is installed, then run:  
`npm install`  
This should install all the dependencies. If it does not, then you can manually install them below.  

2. The second is the React framework. Install by typing:  
`npm install react react-dom` or `yarn add react react-dom`  
3. The third is the Chakra UI libraries. Insall by typing:  
`npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion` or  
`yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion`  
4. The fourth is the Formik UI libraries. Install by typing:  
`npm install formik --save` or `yarn add formik`  
5. 

## Tutorial:  

1. **Get Metamask**  

The first step to running this project is to have a Metamask account.  
The link to install Metamask is [here](https://metamask.io/download/).  
Once you install Metamask, log in through the extension: 

(Picture here)

Take note of both the wallet address and the private key (do not share!): 

(Picture here)  

Click the three dots in the top left, go to the settings and enable "Display NFT media" under the "Security & privacy" tab.  

(Pictures here)  

2. **Create a Pinata Account**

The second step is to create a Pinata account to store the metadata which each NFT recieves.  
The link to the website is [here](https://www.pinata.cloud/).  
Create your account on the top right, and head to the web app to get started!  

(Picture)  

Once you are done with creating your account and signing in, you want to make an API key.  

(Picture)  

(Picture)  

Save all the information of the API key.  

Once that is finished, go to "Gateways" on the left and create a new gateway.  

(Picture)  

Save the domain of the gateway for later use.  

3. **Download the release**  
The release is posted on the right side of the GitHub to get the required files to run the project.

(Picture here)  

4. **Install necessary dependencies**

Make sure that you have the dependencies above for the project.  

5. **Create a .env file**  
Create a file in the base directory of the project, named ".env". It should appear like so:  

Inside of the .env file, copy and paste the code below:  

`code here`  

(Picture here)  

Paste your Pinata JWT from the key that you made, as well as the gateway URL.  

(Picture here)  

The gateway URL should start with "https://".  

6. **Paste private key**
Inside of "hardhat.config.js, paste the private key where it says "SAIGON_PRIVATE_KEY".  

(Picture here) 

7. **Run the app**  

Run the following code in the terminal below:  
`npm start`

This should bring up the react app with onto your local machine.  

(Picture)

Click "Connect Wallet" to add the Saigon network to your Metamask networks. If it doesn't work, you can find the link to the network information [here](https://docs.roninchain.com/validators/setup/parameters/testnet).  

8. **Get faucet tokens**  

To obtain tokens for the faucet, visit the [Ronin faucet](https://faucet.roninchain.com/).  

Paste your wallet in, and request for a **RON**.  

(Picture)

9. **Deploy the contract**  
In the terminal at the root folder, copy and paste the code below to deploy the contract.  

`npx hardhat run --network saigon scripts/deploy.js`  

The terminal should return the address for the contract, so copy and paste in into the .env file:  

(terminal picture)  

(picture of env file)  

If you want to check out the contract that is deployedm, it can be seen in the [block explorer](https://saigon-app.roninchain.com/). You just need to copy and paste the contract address above to see it!  

10. **Run app again**  
With all the preliminary steps out of the way, you can run the app now!  

There are 7 main parts to the app:  
1. Connect Wallet - this connects your wallet to the network and determines which account will mint an NFT.  
2. Open Metadata - this opens a form to submit images and metadata that will be stored in the NFT.  
3. Mint Item - mints the NFT with the metadata that is filled out above.  
4. NFT Options - opens up two different options for minting an item.  
5. Obtain NFT - imports the NFT () to the address that the app is currently connected to (only if you own the NFT!) in Metamask.  
6. Send NFT - sends an NFT to the wallet address that you paste in the "recipient" field.  
7. Load NFTs - Loads NFTs that were minted into the main area. You can click on them to see the metadata!  