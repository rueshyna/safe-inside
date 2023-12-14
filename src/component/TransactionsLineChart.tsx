import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import data from '../data/contracts.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsLineChart: React.FC = () => {
  const chartData = {
    labels: data.map((contract) => contract.firstActivityTime.split('T')[0]), // Extracting just the date part
    datasets: [
      {
        label: 'Number of Transactions',
        data: data.map((contract) => contract.numTransactions),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TransactionsLineChart;
