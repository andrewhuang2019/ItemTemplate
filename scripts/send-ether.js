const { ethers } = require("hardhat")

async function main() {
    const [sender] = await ethers.getSigners();
    const receiverAddress = '0x84c7D29c2044F2287f28159a890ba6007399aC04';

    const tx = await sender.sendTransaction({
        to: receiverAddress,
        value: ethers.utils.parseEther("10")
    })

    await tx.wait();

    console.log(`Sent 10 ETH from ${sender.address} to ${receiverAddress}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });