import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  type ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import data from '../data/contracts.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type balanceBarChart = ChartData<'bar', number[], string>;

const BalanceBarChart: React.FC = () => {
  let chartData: balanceBarChart = {
    labels: [],
    datasets: [],
  };

  const labels = data.map((item: any) => item.address);
  const balances = data.map((item: any) => item.balance);

  chartData = {
    labels,
    datasets: [
      {
        label: 'Balance',
        data: balances,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BalanceBarChart;
