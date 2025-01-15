'use client';
import { useState } from 'react';
import { 
  Box, 
  Button,
  TextField,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import CampaignTable from './components/CampaignTable';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useRouter } from 'next/navigation';

const CampaignPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <PageContainer title="Campaigns" description="Campaign Management">
      <DashboardCard title="Campaigns">
        <Box mb={2} sx={{ height: 600, width: '100%' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <TextField
              label="Search Campaigns"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => router.push('/campaign/create')}
            >
              Create Campaign
            </Button>
          </Stack>
          <CampaignTable searchTerm={searchTerm} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CampaignPage;
