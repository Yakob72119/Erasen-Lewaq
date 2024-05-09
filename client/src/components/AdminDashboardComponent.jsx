import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboardComponent = () => {
  // State to store fetched data
  const [data, setData] = useState({
    numStudents: 100,
    numEducators: 20,
    numExamsTaken: 10,
    numExamsPassed: 8,
    numFiles: 2,
  });

  // // Function to fetch data from database
  // const fetchData = async () => {
  //   // Assume you have a function called fetchDashboardData that fetches data from your database
  //   const dashboardData = await fetchDashboardData();
  //   setData(dashboardData);
  // };

  // useEffect(() => {
  //   // Fetch data when component mounts
  //   fetchData();
  // }, []);

  // Chart data
  const chartData = {
    labels: ['Students', 'Educators', 'Exams Taken', 'Exams Passed', 'Files'],
    datasets: [
      {
        data: [data.numStudents, data.numEducators, data.numExamsTaken, data.numExamsPassed, data.numFiles],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
      },
    ],
  };

  return (
    <div>
      <div style={{ width: '50%', margin: 'auto' }}>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
