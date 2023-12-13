import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import data from '../data/contracts.json'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ContractChartData = ChartData<'bar', number[], string>;


const ContractsChart: React.FC = () => {
  const [chartData, setChartData] = useState<ContractChartData>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
        const labels = data.map((item: any) => item.address);
        const balances = data.map((item: any) => item.balance);
        
        setChartData({
          labels,
          datasets: [
            {
              label: 'Balance',
              data: balances,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
          ],
        });
  }, []);

  return <Bar data={chartData} />;
};

export default ContractsChart;
