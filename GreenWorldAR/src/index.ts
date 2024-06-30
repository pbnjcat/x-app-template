import { DeployParams, HDNode, addressUtils, clauseBuilder } from '@vechain/sdk-core';
import fs from 'fs';
import { ProviderInternalBaseWallet, ThorClient, VeChainProvider } from '@vechain/sdk-network';

//
const abi = JSON.parse(fs.readFileSync('contract.abi', 'utf8'));
const bin = fs.readFileSync('contract.bin', 'utf8');

async function main() {
    try {
        const walletAddress = {REPLACE WITH YOUR WALLET ADDRESS}
        const mnemonic = {REPLACE WITH YOUR MNEMONIC};

        const wallet = HDNode.fromMnemonic(mnemonic.split(' ')).derive('m/0')

        console.log('Wallet Address:', addressUtils.fromPrivateKey(wallet.privateKey!));

        const thor = ThorClient.fromUrl("https://testnet.vechain.org/");
        const provider = new VeChainProvider(thor, new ProviderInternalBaseWallet([{
            privateKey: Buffer.from(wallet.privateKey!),
            address: walletAddress
        }]))
        const signer = await provider.getSigner()

        const factory = thor.contracts.createContractFactory(abi, bin, signer!)

        const model = 'https://ipfs.io/ipfs/QmbNhpYf43xv4kVGUoNFJgrU13MnW8i4Yd8CpNV71XSbEY';
        const lat = '37.759892'
        const lng = '-122.389229'
        const name = 'House_1'
        const b3trPrice = '50'
        ;
        const deployParams: DeployParams = { types: ['string', 'string', 'string', 'string', 'uint256'], values: [model, lat, lng, name, b3trPrice] }
        await factory.startDeployment(deployParams)

        const tx = await factory.waitForDeployment()
        console.log(tx)

        const clause = clauseBuilder.deployContract(bin);

        console.log(clause)

    } catch (err: any) {
        console.error('Error:', err.message);
    }
}

main();
