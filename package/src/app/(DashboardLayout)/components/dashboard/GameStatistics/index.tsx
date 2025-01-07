import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import GameChart from './GameChart';

type CampaignKey = 'campaign1' | 'campaign2' | 'campaign3';

const MOCK_DATA: Record<CampaignKey, { realtimeQuizz: number; lacXi: number }> = {
  'campaign1': {
    realtimeQuizz: 150,
    lacXi: 100,
  },
  'campaign2': {
    realtimeQuizz: 200,
    lacXi: 180,
  },
  'campaign3': {
    realtimeQuizz: 120,
    lacXi: 90,
  },
};

const GameStatistics = () => {
  const [campaign, setCampaign] = useState<CampaignKey>('campaign1');

  return (
    <Box>
      <GameChart data={MOCK_DATA[campaign]} />
    </Box>
  );
};

export default GameStatistics;