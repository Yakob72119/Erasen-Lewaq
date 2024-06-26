
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend);


const EduDashboardComponent = () => {
  // State to store fetched data
  const [data, setData] = useState({
    numExamsPost: 10,
    numExamsAccepted: 8,
    numFiles: 2,
    paymentIncrease: [], // Array to store user increase data
  });

  // Function to fetch data from database
  

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      // Simulate fetching data for now, replace with actual API call
      const userIncreaseData = [10, 15, 20, 25, 30]; // Example data for user increase each month
      setData(prevData => ({ ...prevData, userIncrease: userIncreaseData }));
    };
    fetchData();
  }, [data]);

  // Chart data
  const chartData = {
    labels: [ 'Exams Send', 'Exams Accepted', 'Files'],
    datasets: [
      {
        data: [data.numExamsPost, data.numExamsAccepted, data.numFiles],
        backgroundColor: [ '#FFCE56', '#4CAF50', '#e64e3d'],
        hoverBackgroundColor: [ '#FFCE56', '#4CAF50', '#e64e3d'],
      },
    ],
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  // Chart data for user increase
  const userIncreaseChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'], // Example months
    datasets: [
      {
        label: 'Payment Increase',
        data: data.paymentIncrease,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='admin-dashboard'>
      <h1>Dashboard</h1>

      <div className='chartData'>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className='increaseData'>
        <h2>User Increase per Month</h2>
        <Bar data={userIncreaseChartData} />
      </div>
    </div>
  );
};

export default EduDashboardComponent;
