import { TEMP_CONTRACTS_FOLDER_PATH, TZKT_API, VERSIONS } from './context/config';

import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries: number = 5): Promise<any> => {
    console.log("URL", url)
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.log(`Attempt ${i + 1} failed; retrying in 5 seconds...`);
            await sleep(5000);
        }
    }
    throw new Error('Max retries reached.');
};

const allVersion = () => Object.keys(VERSIONS).join(",");

const fetchContracts = async () => {
    const tempFolderPath = path.join(TEMP_CONTRACTS_FOLDER_PATH, 'temp');
    if (!fs.existsSync(tempFolderPath)) {
        fs.mkdirSync(tempFolderPath, { recursive: true });
    }

    let offset = 0;
    let shouldContinue = false;
    const limit = 100;

    do {
        const query = `${TZKT_API}/contracts?codeHash.in=${allVersion()}&limit=${limit}&offset=${offset}&sort.desc=lastActivity&includeStorage=true`;
        const result = await fetchWithRetry(query);

        if (result && result.length > 0) {
            const filePath = path.join(tempFolderPath, `contracts_${offset}.json`);
            fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
            console.log(`Data written to ${filePath}`);

            shouldContinue = result.length === limit;
            offset += 1;
        } else {
            shouldContinue = false;
        }
    } while (shouldContinue);
};

fetchContracts().catch(console.error);