'use client'
import { useState } from 'react';
import { 
  Box, 
  Button,
  TextField,
  IconButton,
  Stack,
  InputAdornment
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';


interface Account {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  role: string;
  email: string;
  phone: string;
  password: string;
}

const AccountPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (id: any) => {
    router.push('/account/update');
  };
  const handleSearch = () => {
    console.log('Search:', searchTerm); // Replace with your search logic
  };

  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'avatar', headerName: 'Avatar', width: 100 },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'fullname', headerName: 'Fullname', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'password', headerName: 'Password', width: 150 },
    { field: 'role', headerName: 'Role', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
        <IconButton
          onClick={() => handleEdit(params.row.id)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(params.row.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </>
      )
    }
  ];

  // Sample data - replace with actual API call
  const rows: Account[] = [
    {
      id: '1',
      username: 'akai02',
      fullname: 'Le Thanh Nhan',
      avatar: '21',
      role: 'User',
      email:"",
      phone: "",
      password: ""
    },
    // Add more sample data as needed
  ];

  const handleDelete = (id: string) => {
    console.log('Delete account:', id);
    // Implement delete logic
  };

  const filteredRows = rows.filter(row =>
    row.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <PageContainer title="Account" description="Account Management">
      <DashboardCard title="Account List">
        <Box  mb={2} sx={{ height: 600, width: '100%' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
           <TextField
              label="Search Users"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
            
          ),
             }}
            />

           <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => router.push('/account/create')}
          >
            Create User
          </Button>
        </Stack>
        
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default AccountPage;