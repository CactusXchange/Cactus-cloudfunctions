import { ethers } from 'ethers';
import { NETWORK_URL } from '../config/constants/networks';
export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(NETWORK_URL)