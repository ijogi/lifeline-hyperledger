/*
 * SPDX-License-Identifier: Apache-2.0
 */

import * as FabricCAServices from 'fabric-ca-client';
// import { Wallets, X509Identity } from 'fabric-network';
import { FileSystemWallet, X509WalletMixin }  from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

// capture network variables from config.json
const configPath = path.join(process.cwd(), 'config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let connection_file = config.connection_file;
let appAdmin = config.appAdmin;
let appAdminSecret = config.appAdminSecret;
let orgMSPID = config.orgMSPID;
let caName = config.caName;

const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


export default async function() {
    try {
        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[caName].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        // const wallet = await Wallets.newFileSystemWallet(walletPath);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        // const identity = await wallet.get(appAdmin);
        const adminExists = await wallet.exists(appAdmin);
        if (adminExists) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        // const enrollment = await ca.enroll({ enrollmentID: appAdmin, enrollmentSecret: appAdminSecret });
        // const x509Identity: X509Identity = {
        //     credentials: {
        //         certificate: enrollment.certificate,
        //         privateKey: enrollment.key.toBytes(),
        //     },
        //     mspId: orgMSPID,
        //     type: 'X.509',
        // };
        // await wallet.put(appAdmin, x509Identity);

        const enrollment = await ca.enroll({ enrollmentID: appAdmin, enrollmentSecret: appAdminSecret });
        const identity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
        wallet.import(appAdmin, identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}
