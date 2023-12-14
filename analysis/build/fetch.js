var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TZKT_API, VERSIONS } from './config';
import * as fs from 'fs';
import fetch from 'node-fetch';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const fetchContractCounts = (hashes, maxRetries = 3) => __awaiter(void 0, void 0, void 0, function* () {
    const counts = {};
    for (const [hash, version] of Object.entries(hashes)) {
        let attempts = 0;
        while (attempts < maxRetries) {
            try {
                const response = yield fetch(`${TZKT_API}/v1/contracts/count?codeHash=${hash}`);
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.status}`);
                }
                const count = yield response.json();
                counts[version] = Number(count);
                break; // Break the loop if fetch was successful
            }
            catch (error) {
                attempts++;
                console.error(`Retry attempt ${attempts} for hash ${hash}:`, error);
                if (attempts < maxRetries) {
                    yield sleep(5000); // Wait for 5 seconds before retrying
                }
                else {
                    counts[version] = 0; // Set to 0 or handle accordingly if all retries fail
                }
            }
        }
    }
    return counts;
});
fetchContractCounts(VERSIONS).then(counts => {
    fs.writeFileSync('../src/data/contractVersion.json', JSON.stringify(counts, null, 2));
    console.log('Data written to data.json');
}).catch(error => {
    console.error('An error occurred:', error);
});
