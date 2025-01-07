'use client'
import { useState } from 'react';
import { 
  Box, 
  Button,
  TextField,
  IconButton,
  Stack
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import CampaignTable from './components/CampaignTable';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


interface Campaign {
  id: string;
  image: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'ENDED' | 'NOT_ACCEPTED' | 'PENDING';
  initial: number;
  remaining: number;
  paid: boolean;
}

const CampaignPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'initial', headerName: 'Initial', width: 100 },
    { 
      field: 'remaining', 
      headerName: 'Remaining', 
      width: 130,
      renderCell: (params) => `${params.value}%` 
    },
    {
      field: 'paid',
      headerName: 'Paid',
      width: 100,
      renderCell: (params) => (
        params.value ? 
          <CheckCircleIcon color="success" /> : 
          <CancelIcon color="error" />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton 
          onClick={() => handleDelete(params.row.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  // Sample data - replace with actual API call
  const rows: Campaign[] = [
    {
      id: '1',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjiXI_CVT6hgHAP-C6qYjEUxZZKqKmLgAdcmFtwa6S23b4wDfu44OAnVIO6HC1n2nXSO0B5NISYftGEnbelz0AfoV1R5OeTHyRhycM7GNLhr6UdRnzfTRAhfGeWSZfSw0NPftSXKdPYNPY5/s1600/KFC+Jammo+Obama+1.jpg',
      name: 'Summer Campaign',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      status: 'PENDING',
      initial: 1000,
      remaining: 75,
      paid: true
    },
    // Add more sample data as needed
  ];

  const handleDelete = (id: string) => {
    console.log('Delete campaign:', id);
    // Implement delete logic
  };

  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <CampaignTable campaigns={rows} onDelete={function (id: string): void {
          throw new Error('Function not implemented.');
        } } />
      </Box>
      </DashboardCard>
    </PageContainer>
    
  );
};

export default CampaignPage;