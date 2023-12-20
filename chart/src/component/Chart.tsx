// Chart.tsx
import ContractCountBarChart from './ContractCountBarChart';
import data10XTZContractCount from '../data/10XTZContractCount.json';
import dataAllContractCount from '../data/allContractCount.json';
import dataMonthlyActivityContractCount from '../data/monthlyActivityContractCount.json';
import dataMonthlyContractCount from '../data/monthlyContractCount.json';
import dataStatisticsTokenCount from '../data/statisticsTokenCount.json';
import dataStatisticsXTZCount from '../data/statisticsXTZCount.json';
import dataStatisticsOwnerCount from '../data/statisticsOwnerCount.json';
import dataStatisticsThresholdPercentage from '../data/statisticsThresholdPercentage.json';
import dataStatisticsThresholdPercentageSans1Of1 from '../data/statisticsThresholdPercentageSans1Of1.json';
import dataStatisticsThresholdPercentageWith1OfM from '../data/statisticsThresholdPercentageWith1OfM.json';
import React from 'react';

const versions = [ "0.0.6", "0.0.8", "0.0.9", "0.0.10", "0.0.11", "0.0.11b", "0.1.1", "0.3.0", "0.3.1", "0.3.2", "0.3.3" ]
const percentage = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
type DatasetType = { [key: string]: number };

/** count by version */
const dsAllContractCount : DatasetType = dataAllContractCount as DatasetType;
const dsMonthlyContractCount : DatasetType = dataMonthlyContractCount as DatasetType;
const dsMonthlyActivityContractCount : DatasetType = dataMonthlyActivityContractCount as DatasetType;
const ds10XTZContractCount : DatasetType = data10XTZContractCount as DatasetType;

/**  distribution */
const dsStatisticsXTZCount : DatasetType = dataStatisticsXTZCount as DatasetType;
const dsStatisticsTokenCount : DatasetType = dataStatisticsTokenCount as DatasetType;
const dsStatisticsOwnerCount : DatasetType = dataStatisticsOwnerCount as DatasetType;

/** N of M */
const dsStatisticsThresholdPercentage : DatasetType = dataStatisticsThresholdPercentage as DatasetType;
const dsStatisticsThresholdPercentageSans1of1 : DatasetType = dataStatisticsThresholdPercentageSans1Of1 as DatasetType;

/** 1 of M */
const dsStatisticsThresholdPercentageWith1of1 : DatasetType = dataStatisticsThresholdPercentageWith1OfM as DatasetType;


const contractDatasets = [
  {
    label: 'All Contract',
    data: versions.map(key => (key in dsAllContractCount ? dsAllContractCount[key] : -1))
  },
  {
    label: 'Monthely New Contract',
    data: versions.map(key => (key in dsMonthlyContractCount) ? dsMonthlyContractCount[key] : -1),
  },
  {
    label: 'Recent Month Activity of Contract',
    data: versions.map(key => (key in dsMonthlyActivityContractCount) ? dsMonthlyActivityContractCount[key] : -1),
  },
  {
    label: 'Balance > 10XTZ',
    data: versions.map(key => (key in ds10XTZContractCount) ? ds10XTZContractCount[key] : -1),
  },
];

const xtzDataset = [
  {
    label: 'Distribution of Safe by Number of XTZ',
    data: Object.values(dsStatisticsXTZCount)
  }
]

const tokenDataset = [
  {
    label: 'Distribution of Safe by Number of Tokens',
    data: Object.values(dsStatisticsTokenCount)
  }
]

const ownerDataset = [
  { 
    label: 'Distribution of Safe by Number of owners',
    data: Object.values(dsStatisticsOwnerCount)
  }
]

const nOfm = [
  { 
    label: 'N-of-M',
    data: percentage.map(key => (key in dsStatisticsThresholdPercentage) ? dsStatisticsThresholdPercentage[key] : 0) 
  },
  { 
    label: 'N-of-M without 1-of-1',
    data: percentage.map(key => (key in dsStatisticsThresholdPercentageSans1of1) ? dsStatisticsThresholdPercentageSans1of1[key] : 0) 
  },
  { 
    label: '1-of-M',
    data: percentage.map(key => (key in dsStatisticsThresholdPercentageWith1of1) ? dsStatisticsThresholdPercentageWith1of1[key] : 0) 
  },
]

const Chart: React.FC = () => {
  return (
    <div className="flex-1 container mx-auto flex flex-wrap -mx-2">
      <div className="w-full p-2">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Dashboard
        </h1>
        <div className="text-sm text-gray-600 mt-2 mb-2 text-left">
          If x-asia presents -1, it means something wrong with dataset
        </div>
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">Contract count</h2>
        <ContractCountBarChart
          datasets={contractDatasets}
          labels={versions}
        />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">XTZ</h2>
        <ContractCountBarChart
          datasets={xtzDataset}
          labels={Object.keys(dsStatisticsXTZCount)}
        />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">Tokens</h2>
        <ContractCountBarChart
          datasets={tokenDataset}
          labels={Object.keys(dsStatisticsTokenCount)}
        />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">Owner</h2>
        <ContractCountBarChart
          datasets={ownerDataset}
          labels={Object.keys(dsStatisticsOwnerCount)}
        />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">Distribution of Safe by Number of {'(N/M)%, N-of-M'}</h2>
        <ContractCountBarChart
          datasets={nOfm}
          labels={percentage}
        />
      </div>
    </div>
  );
};

export default Chart;