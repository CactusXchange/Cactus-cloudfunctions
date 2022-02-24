import * as functions from "firebase-functions";
import { ethers } from "ethers";
import { simpleRpcProvider } from './utils/web3';
import { getCacttTokenContract } from "./utils/contractHelpers";
import { NonceManager } from "@ethersproject/experimental";

const privateKey = process.env.PRIVATE_KEY;

export const releaseInitialWhitelistPayment = functions.pubsub.schedule('*/6 * * * *').timeZone('America/New_York')
  .onRun(async (context) => {
    const contract = getCacttTokenContract();
    
    let wallet = new ethers.Wallet(privateKey, simpleRpcProvider);
    const managedSigner = new NonceManager(wallet);
    let contractWithSigner = contract.connect(managedSigner);
    let tx = await contractWithSigner.initialPaymentRelease({ nonce: wallet.getTransactionCount()});

    functions.logger.info(tx.hash);
    await tx.wait();
  });

export const releaseMonthlyWhitelistPayment = functions.pubsub.schedule('*/15 * * * *').timeZone('America/New_York')
  .onRun(async (context) => {
    const contract = getCacttTokenContract();

    let wallet = new ethers.Wallet(privateKey, simpleRpcProvider);
    const managedSigner = new NonceManager(wallet);
    let contractWithSigner = contract.connect(managedSigner);
    let tx = await contractWithSigner.timelyWhitelistPaymentRelease({ nonce: wallet.getTransactionCount() });

    functions.logger.info(tx.hash);
    await tx.wait();
  });