'use client'
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Stack,
  Popover,
  MenuItem,
  Typography,
  Select,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox

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
import FilterListIcon from '@mui/icons-material/FilterList';



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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const router = useRouter();


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

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterReset = () => {
    setFilterStatus('');
    setFilterStartDate('');
    setFilterEndDate('');
    setAnchorEl(null);
  };

  // const filteredRows = rows.filter(row => {
  //   return (
  //     row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (filterStatus ? row.status === filterStatus : true) &&
  //     (filterStartDate ? row.startDate >= filterStartDate : true) &&
  //     (filterEndDate ? row.endDate <= filterEndDate : true)
  //   );
  // });

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    setFilterStatuses(prev =>
      checked ? [...prev, value] : prev.filter(status => status !== value)
    );
  };


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
            <Box>
              <TextField
                label="Search Campaigns"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton onClick={handleFilterClick}>
                <FilterListIcon />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box p={2} sx={{ width: '300px' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Filter Options
                  </Typography>
                  <FormControl component="fieldset">
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filterStatuses.includes('ENDED')}
                            onChange={handleStatusChange}
                            value="ENDED"
                          />
                        }
                        label="Ended"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filterStatuses.includes('NOT_ACCEPTED')}
                            onChange={handleStatusChange}
                            value="NOT_ACCEPTED"
                          />
                        }
                        label="Not Accepted"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filterStatuses.includes('PENDING')}
                            onChange={handleStatusChange}
                            value="PENDING"
                          />
                        }
                        label="Pending"
                      />
                    </FormGroup>
                  </FormControl>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mt: 2 }}
                  />
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" onClick={handleFilterReset}>
                      Reset
                    </Button>
                    <Button variant="contained" onClick={handleFilterClose}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Popover>
            </Box>
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
          }} />
        </Box>
      </DashboardCard>
    </PageContainer>

  );
};

export default CampaignPage;