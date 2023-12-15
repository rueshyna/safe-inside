import './App.css';
import ContractCountBarChart from './component/ContractCountBarChart';

import dataAllCountractCount from './data/allContractCount.json';
import dataMonthlyContractCount from './data/monthlyContractCount.json'
import data10XTZContractCount from './data/10XTZContractCount.json';
import dataMonthlyActivityContractCount from './data/monthlyActivityContractCount.json'
import dataLastUpdatedTime from './data/lastUpdatedTime.json'
import dataStatisticsNFTCount from './data/statisticsNFTCount.json'
import dataStatisticsOwnerCount from './data/statisticsOwnerCount.json'
import dataStatisticsThresholdPercentage from './data/statisticsThresholdPercentage.json'
import dataStatisticsThresholdPercentageSans1Of1 from './data/statisticsThresholdPercentageSans1Of1.json'
import dataStatisticsThresholdPercentageWith1OfM from './data/statisticsThresholdPercentageWith1OfM.json'
import dataStatisticsThresholdPercentageWith1OfMSans1Of1 from './data/statisticsThresholdPercentageWith1OfMSans1Of1.json'



const App: React.FC = (): JSX.Element => {
  return (
    <div className="App container mx-auto flex flex-wrap -mx-2">
      <div className="w-full p-2">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Last Updated: {dataLastUpdatedTime.lastUpdatedTime}
                </h1>
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          All Contract
        </h2>
        <ContractCountBarChart data={dataAllCountractCount} label="Number of Contracts" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          Monthely New Contract
        </h2>
        <ContractCountBarChart data={dataMonthlyContractCount} label="Number of Contracts" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          Balance of Contract {">"} 10XTZ
        </h2>
        <ContractCountBarChart data={data10XTZContractCount} label="Number of Contracts" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          Activity of Contract 
        </h2>
        <ContractCountBarChart data={dataMonthlyActivityContractCount} label="Number of Contracts" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          NFT Count 
        </h2>
        <ContractCountBarChart data={dataStatisticsNFTCount} label="Number of NFT" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          Owner Count 
        </h2>
        <ContractCountBarChart data={dataStatisticsOwnerCount} label="Number of owners" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          Threshold
        </h2>
        <ContractCountBarChart data={dataStatisticsThresholdPercentage} label="Threshold" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          Threshold without 1-of-1
        </h2>
        <ContractCountBarChart data={dataStatisticsThresholdPercentageSans1Of1} label="Threshold without 1-of-1" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          Threshold with 1-of-m
        </h2>
        <ContractCountBarChart data={dataStatisticsThresholdPercentageWith1OfM} label="Threshold with 1-of-m" />
      </div>
      <div className="w-1/2 p-2">
        <h2 className="text-lg font-bold text-center mb-2">
          Threshold with 1-of-m, but without 1-of-1
        </h2>
        <ContractCountBarChart data={dataStatisticsThresholdPercentageWith1OfMSans1Of1} label="Threshold with 1-of-m, but without 1-of-1" />
      </div>
     
    </div>
  );
};

export default App;
