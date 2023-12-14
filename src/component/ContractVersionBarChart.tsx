import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { VERSIONS } from '../../script/context/config'
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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

type contractVersionBarChart = ChartData<'bar', number[], string>;

const ContractsChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>({});


    return <Bar data={chartData} />;
};

export default ContractsChart;