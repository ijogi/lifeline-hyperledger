import { Injectable, InternalServerErrorException } from '@nestjs/common';

// import { Gateway, Wallets } from 'fabric-network';
import { FileSystemWallet, Gateway }  from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FabricService {

  constructor() {}

  async getContract(contractName: string, channelName = 'mychannel', userName = 'admin') {
    try {
      const configPath = path.join(process.cwd(), 'config.json');
      const configJSON = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(configJSON);
      const ccpPath = path.join(process.cwd(), config.connection_file);
      const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
      const ccp = JSON.parse(ccpJSON);
      
      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = new FileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);
      
      // Check to see if we've already enrolled the user.
      const userExists = await wallet.exists(userName);
      if (!userExists) {
          console.log(`An identity for the user ${userName} does not exist in the wallet`);
          console.log('Run the enrollAdmin.js application before retrying');
          return;
      }
      
      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, { wallet, identity: userName, discovery: {enabled: true, asLocalhost: true } });
      
      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork(channelName);
      
      // Get the contract from the network.
      const contract = network.getContract(contractName);
      return contract;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e)
    }
  }
  
}