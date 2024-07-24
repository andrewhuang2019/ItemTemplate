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

## Tutorial:  

1. Get Metamask  

The first step to running this project is to have a Metamask account.  
The link to install Metamask is [here](https://metamask.io/download/).  
Once you install Metamask, log in through the extension: 

(Picture here)

Take note of both the wallet address and the private key (do not share!): 

(Picture here)  

Click the three dots in the top left, go to the settings and enable "Display NFT media" under the "Security & privacy" tab.  

(Pictures here)

2. Download the release on the right side of the GitHub to get the required files to run the project.  

3. Install any necessary dependencies for the project in the "Dependencies section".  

4. Create a .env.local file

5. Deploy the contract  

6. Run the app  

Navigate to the root directory if you haven't already. Run the following code in the terminal below:  
`npm start`

This should bring up the react app with onto your local machine. 

