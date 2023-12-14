import './App.css';
import BalanceBarChart from './component/BalanceBarChart';
import TransactionsLineChart from './component/TransactionsLineChart';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <div className="m-4 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold text-center mb-2">
          Contract Balances
        </h2>
        <BalanceBarChart />
      </div>

      <div className="m-4 p-4 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-lg font-bold text-center mb-2">
          Transactions Over Time
        </h2>
        <TransactionsLineChart />
      </div>
    </div>
  );
};

export default App;
