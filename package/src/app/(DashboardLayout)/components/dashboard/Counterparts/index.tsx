import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DiscountChart from './DiscountChart';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import DashboardCard from '../../shared/DashboardCard';


// Define campaign type
type CampaignKey = 'campaign1' | 'campaign2' | 'campaign3';

// Define mock data type
const MOCK_DATA: Record<CampaignKey, number[]> = {
  'campaign1': [50, 30, 20, 15, 10],
  'campaign2': [45, 35, 25, 20, 15],
  'campaign3': [60, 40, 30, 25, 20],
};

const Counterparts = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, 'month'));
  const [campaign, setCampaign] = useState<CampaignKey>('campaign1');

  return (
    <DashboardCard title="Counterparts Statistics">
    <Box>
     <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            sx={{ width: 200 }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            sx={{ width: 200 }}
          />
        </LocalizationProvider>
      </Box>

      <DiscountChart data={MOCK_DATA[campaign]} />
    </Box>
    </DashboardCard>
  );
};

export default Counterparts;