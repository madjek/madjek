import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const CoinChart = ({ priceChart, period }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );

  let t = [];
  let pr = [];
  for (let i = 0, len = priceChart?.length; i < len; i++) {
    switch (period) {
      case 'day':
        t.push(moment(priceChart[i][0]).format('HH:mm'));
        break;
      case 'week':
        t.push(moment(priceChart[i][0]).format('MMM-DD'));
        break;
      case 'month':
        t.push(moment(priceChart[i][0]).format('MMM-DD'));
        break;

      default:
        break;
    }
    pr.push(priceChart[i][1]);
  }

  const options = {
    responsive: true,
    color: '#ffffff',
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      yAxes: {
        ticks: {
          color: '#ffffff',
        },
      },
      xAxes: {
        ticks: {
          color: '#ffffff',
        },
      },
    },
  };

  const data = {
    labels: t,
    datasets: [
      {
        data: pr,
        backgroundColor: 'rgb(56,181,154)',
        borderColor: 'rgb(56,181,154)',
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default CoinChart;
