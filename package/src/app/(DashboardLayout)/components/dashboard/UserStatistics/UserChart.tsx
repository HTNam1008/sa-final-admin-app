import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface UserData {
  user: number[];
}

interface UserChartProps {
  data: UserData;
  labels: string[];
}

const UserChart: React.FC<UserChartProps> = ({ data, labels }) => {
  const theme = useTheme();

  const chartData: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: 'Participated Users',
        data: data.user,
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    
      <Box>
        <Typography variant="h6" gutterBottom>
          Statistics Overview
        </Typography>
        <Line data={chartData} options={options} />
      </Box>
  );
};

export default UserChart;