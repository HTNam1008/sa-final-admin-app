'use client'
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Stack,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Popover,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
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
import FilterListIcon from '@mui/icons-material/FilterList';


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
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const [selectedId, setSelectedId] = useState<string | null>(null); // Track selected ID for deletion
  const [filterRole, setFilterRole] = useState<string | null>(null); // State for role filter
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Anchor for filter popover
  const handleEdit = (id: any) => {
    router.push('/account/update');
  };
  const handleSearch = () => {
    console.log('Search:', searchTerm); // Replace with your search logic
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    console.log('Delete confirmed for ID:', selectedId);
    setOpenDialog(false);
    setSelectedId(null);
    // Implement actual delete logic here
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (role: string) => {
    setFilterRole((prevRole) =>
      prevRole === role ? null : role
    );
  };


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={params.value || 'https://i.pinimg.com/736x/91/54/1c/91541c77e2a2f6e9331c34c477e9ef4b.jpg'} // Fallback to a default image if `avatar` is empty
          alt="Avatar"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
      ),
    },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'fullname', headerName: 'Fullname', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    {
      field: 'password',
      headerName: 'Password',
      width: 150,
      renderCell: (params) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isHidden, setIsHidden] = useState(true);

        const toggleVisibility = () => {
          setIsHidden(!isHidden);
        };

        return (
          <div onClick={toggleVisibility} style={{ cursor: 'pointer', userSelect: 'none' }}>
            {isHidden ? '••••••••' : params.value}
          </div>
        );
      },
    },
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
      avatar: 'https://i.pinimg.com/736x/91/54/1c/91541c77e2a2f6e9331c34c477e9ef4b.jpg',
      role: 'User',
      email: "",
      phone: "",
      password: "sss"
    },
    // Add more sample data as needed
  ];

  const filteredRows = rows.filter(row =>
    row.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <PageContainer title="Account" description="Account Management">
      <DashboardCard title="Account List">
        <Box mb={2} sx={{ height: 600, width: '100%' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box display="flex" alignItems="center" gap={1}>
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
                <Box p={2} sx={{ width: '200px' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Filter By Role
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={filterRole}
                      onChange={(event) => handleFilterSelect(event.target.value)}
                    >
                      <FormControlLabel
                        value="User"
                        control={<Radio />}
                        label="User"
                      />
                      <FormControlLabel
                        value="Counterpart"
                        control={<Radio />}
                        label="Counterpart"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={() => handleFilterSelect('')} color="primary">
                      Reset
                    </Button>
                  </Box>
                </Box>
              </Popover>
            </Box>
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
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default AccountPage;