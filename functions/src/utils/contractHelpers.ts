import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { simpleRpcProvider } from '../utils/web3';
import { CHAIN_ID } from '../config/constants/networks';
import contracts from '../config/constants/contracts';

const cacttWhitelistAbi = require('../../abis/cacttWhitelist.json');

const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new Contract(address, abi, signerOrProvider)
}

export const getCacttTokenContract = (signer?: Signer | Provider) => {
  return getContract(cacttWhitelistAbi, contracts.cacttWhitelist[CHAIN_ID], signer)
}