import React, { useState } from 'react';
import { Grid, Select, MenuItem, Box } from '@mui/material';
import CampaignStats from './CampaignStats';
import CustomerStats from './CustomerStats';
import Counterparts from './Counterparts';
import Incomes from './Incomes';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const GeneralStatistics = () => {
  const [timeFrame, setTimeFrame] = useState('today');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTimeFrame(event.target.value);
  };
  return (
    <DashboardCard title="General Statistic">
       <>
       <Box 
          display="flex" 
          justifyContent="flex-end" 
          mb={2} // Adds margin-bottom
        >
          <Select
            value={timeFrame}
            onChange={handleChange}
            displayEmpty
            variant="outlined"
            sx={{ width: '200px' }} // Optional: Set width of Select
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>
        </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <CampaignStats />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomerStats />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Counterparts />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Incomes />
        </Grid>
      </Grid>
      </>
    </DashboardCard>
  );
};

export default GeneralStatistics;