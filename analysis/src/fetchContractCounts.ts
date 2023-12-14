import { TZKT_API, VERSIONS, OUTPUT_PATH } from './context/config';
import * as fs from 'fs';
import fetch from 'node-fetch';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchContractCounts = async (hashes: Record<string, string>, query:string|undefined = undefined, maxRetries: number = 3): Promise<Record<string, number>> => {
    const counts: Record<string, number> = {};

    query = query === undefined ? "" : `&${query}`;

    for (const [hash, version] of Object.entries(hashes)) {
        let attempts = 0;

        while (attempts < maxRetries) {
            try {
                const response = await fetch(`${TZKT_API}/contracts/count?codeHash=${hash}${query}`);
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.status}`);
                }
                const count = await response.json();
                counts[version] = Number(count);
                break; // Break the loop if fetch was successful
            } catch (error) {
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

function sortObjectByKey(obj: { [key: string]: number }): { [key: string]: number } {
    const sortedEntries = Object.entries(obj).sort((a, b) => {
        // Assuming the keys are semver-like strings, we split them by dots and compare each segment
        const aParts = a[0].split('.');
        const bParts = b[0].split('.');
        
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
            const aVal = parseInt(aParts[i], 10) || 0;
            const bVal = parseInt(bParts[i], 10) || 0;

            if (aVal !== bVal) return aVal - bVal;

            // Handling alphanumeric parts (like '11b')
            if (aParts[i] !== bParts[i]) {
                return aParts[i] > bParts[i] ? 1 : -1;
            }
        }

        return 0;
    });

    return Object.fromEntries(sortedEntries);
}

fetchContractCounts(VERSIONS).then(counts => {
    fs.writeFileSync(`${OUTPUT_PATH}/allContractCount.json`, JSON.stringify(sortObjectByKey(counts), null, 2));
    console.log('Data written to allContractCount.json');
}).catch(error => {
    console.error('An error occurred:', error);
});

function oneMonthAgo(): string {
    const now = new Date();
    now.setMonth(now.getMonth() - 1); // Subtract one month

    // Format the date in ISO 8601 format
    return now.toISOString();
}

fetchContractCounts(VERSIONS, `firstActivityTime.gt=${oneMonthAgo()}`).then(counts => {
    fs.writeFileSync(`${OUTPUT_PATH}/monthlyContractCount.json`, JSON.stringify(sortObjectByKey(counts), null, 2));
    console.log('Data written to monthlyContractCount.json');
}).catch(error => {
    console.error('An error occurred:', error);
});

fetchContractCounts(VERSIONS, `balance.gt=10000000`).then(counts => {
    fs.writeFileSync(`${OUTPUT_PATH}/10XTZContractCount.json`, JSON.stringify(sortObjectByKey(counts), null, 2));
    console.log('Data written to 10XTZContractCount.json');
}).catch(error => {
    console.error('An error occurred:', error);
});

fetchContractCounts(VERSIONS, `lastActivityTime.gt=${oneMonthAgo()}`).then(counts => {
    fs.writeFileSync(`${OUTPUT_PATH}/monthlyActivityContractCount.json`, JSON.stringify(sortObjectByKey(counts), null, 2));
    console.log('Data written to monthlyActivityContractCount.json');
}).catch(error => {
    console.error('An error occurred:', error);
});