import { TZKT_API, VERSIONS } from './context/config';
import * as fs from 'fs';
import fetch from 'node-fetch';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchContractCounts = async (hashes: Record<string, string>, maxRetries: number = 3): Promise<Record<string, number>> => {
    const counts: Record<string, number> = {};

    for (const [hash, version] of Object.entries(hashes)) {
        let attempts = 0;

        while (attempts < maxRetries) {
            try {
                const response = await fetch(`${TZKT_API}/v1/contracts/count?codeHash=${hash}`);
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.status}`);
                }
                const count = await response.json();
                counts[version] = Number(count);
                break; // Break the loop if fetch was successful
            } catch (error) {
                attempts++;
                console.error(`Retry attempt ${attempts} for hash ${hash}:`, error);

                if (attempts < maxRetries) {
                    await sleep(5000); // Wait for 5 seconds before retrying
                } else {
                    counts[version] = 0; // Set to 0 or handle accordingly if all retries fail
                }
            }
        }
    }

    return counts;
};

fetchContractCounts(VERSIONS).then(counts => {
    fs.writeFileSync('../src/data/contractVersion.json', JSON.stringify(counts, null, 2));
    console.log('Data written to data.json');
}).catch(error => {
    console.error('An error occurred:', error);
});