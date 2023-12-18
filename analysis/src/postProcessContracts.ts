import * as fs from 'fs';
import * as path from 'path';
import { TEMP_FOLDER_PATH, OUTPUT_PATH } from './context/config';

interface Storage {
    proposal_counter: string;
    effective_period: string;
    threshold: string;
}

interface ContractData {
    owner_count: number;
    threshold_percentage: number;
    token_count: number;
    balance: number;
    firstActivityTime: string;
    lastActivityTime: string;
    tzsafe_version: string;
    storage: Storage
}

const tempFolderPath = path.join(TEMP_FOLDER_PATH, 'contracts');

function writeToFile(record: Record<string, any>, filename: string) {
    const filepath = path.join(OUTPUT_PATH, filename);
    fs.writeFileSync(filepath, JSON.stringify(record, null, 2));
    console.log('Written to:', filepath);
}

fs.readdir(tempFolderPath, (err, files) => {
    if (err) {
        console.error('Error reading files from temp folder:', err);
        return;
    }

    const statisticsOwnerCount : Record<number, number> = {}
    const statisticsThresholdPercentage : Record<number, number> = {}
    const statisticsThresholdPercentageSans1Of1: Record<number, number> = {}
    const statisticsThresholdPercentageWith1OfM: Record<number, number> = {}
    const statisticsThresholdPercentageWith1OfMSans1Of1: Record<number, number> = {}
    const statisticsNFTCount: Record<number, number> = {}

    const combinedData: Record<string, number| string>[] = [];


    for (const file of files) {
        const filePath = path.join(tempFolderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        try {
            const data: ContractData[] = JSON.parse(fileContent);
            data.forEach(item => {
                combinedData.push(
                {
                        owner_count: item.owner_count,
                        threshold_percentage: item.threshold_percentage,
                        token_count: item.token_count,
                        threshold: item.storage.threshold,
                        balance: item.balance,
                        firstActivityTime: item.firstActivityTime,
                        lastActivityTime: item.lastActivityTime,
                        effective_period: item.storage.effective_period,
                        proposal_counter: item.storage.proposal_counter,
                        tzsafe_version: item.tzsafe_version,
                })

                if (statisticsOwnerCount[item.owner_count])
                    statisticsOwnerCount[item.owner_count] += 1;
                else
                    statisticsOwnerCount[item.owner_count] = 1;
                
                const p = Math.round(item.threshold_percentage * 100);

                if (statisticsThresholdPercentage[p])
                   statisticsThresholdPercentage[p] += 1;
                else
                    statisticsThresholdPercentage[p] = 1;

                if (item.owner_count !== 1 && item.storage.threshold !== "1") {
                    if (statisticsThresholdPercentageSans1Of1[p])
                        statisticsThresholdPercentageSans1Of1[p] += 1;
                    else
                        statisticsThresholdPercentageSans1Of1[p] = 1;
                }

                if (item.owner_count === 1) {
                    if (statisticsThresholdPercentageWith1OfM[p])
                        statisticsThresholdPercentageWith1OfM[p] += 1;
                    else
                        statisticsThresholdPercentageWith1OfM[p] = 1;
                }

                if (item.owner_count === 1 && item.storage.threshold !== "1") {
                    if (statisticsThresholdPercentageWith1OfMSans1Of1[p])
                        statisticsThresholdPercentageWith1OfMSans1Of1[p] += 1;
                    else
                        statisticsThresholdPercentageWith1OfMSans1Of1[p] = 1;
                }

                if (statisticsNFTCount[item.owner_count])
                    statisticsNFTCount[item.owner_count] += 1;
                else
                    statisticsNFTCount[item.owner_count] = 1;
            });
        } catch (jsonErr) {
            console.error(`Error parsing JSON in file ${file}:`, jsonErr);
        }
    }


    writeToFile(combinedData, 'allData.json');
    writeToFile(statisticsOwnerCount, 'statisticsOwnerCount.json');
    writeToFile(statisticsThresholdPercentage, 'statisticsThresholdPercentage.json');
    writeToFile(statisticsThresholdPercentageSans1Of1, 'statisticsThresholdPercentageSans1Of1.json');
    writeToFile(statisticsThresholdPercentageWith1OfM, 'statisticsThresholdPercentageWith1OfM.json');
    writeToFile(statisticsThresholdPercentageWith1OfMSans1Of1, 'statisticsThresholdPercentageWith1OfMSans1Of1.json');
    writeToFile(statisticsNFTCount, 'statisticsNFTCount.json');
});