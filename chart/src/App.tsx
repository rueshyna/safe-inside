import './App.css';
import ContractCountBarChart from './component/ContractCountBarChart';

import dataAllCountractCount from './data/allContractCount.json';
import dataMonthlyContractCount from './data/monthlyContractCount.json'
import data10XTZContractCount from './data/10XTZContractCount.json';
import dataMonthlyActivityContractCount from './data/monthlyActivityContractCount.json'


const App: React.FC = (): JSX.Element => {
  return (
    <div className="App container mx-auto flex flex-wrap -mx-2">
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

     
    </div>
  );
};

export default App;
