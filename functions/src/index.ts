import * as functions from "firebase-functions";
import { ethers } from "ethers";
import { simpleRpcProvider } from './utils/web3';
import { getCacttTokenContract } from "./utils/contractHelpers";

const privateKey = process.env.PRIVATE_KEY;

export const releaseInitialWhitelistPayment = functions.pubsub.schedule('* * * * *').timeZone('America/New_York')
  .onRun(async (context) => {
    const contract = getCacttTokenContract();

    let wallet = new ethers.Wallet(privateKey, simpleRpcProvider);
    let contractWithSigner = contract.connect(wallet);
    let tx = await contractWithSigner.initialPaymentRelease();

    functions.logger.info(tx.hash);
    await tx.wait();
  });

export const releaseMonthlyWhitelistPayment = functions.pubsub.schedule('*/5 * * * *').timeZone('America/New_York')
  .onRun(async (context) => {
    const contract = getCacttTokenContract();

    let wallet = new ethers.Wallet(privateKey, simpleRpcProvider);
    let contractWithSigner = contract.connect(wallet);
    let tx = await contractWithSigner.timelyWhitelistPaymentRelease();

    functions.logger.info(tx.hash);
    await tx.wait();
  });