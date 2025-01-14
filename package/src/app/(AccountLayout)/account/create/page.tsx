'use client'
import { useState, ChangeEvent } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    Checkbox,
    FormControlLabel,
    MenuItem,
    IconButton,
    Paper,
    Grid,
    Collapse,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useRouter } from 'next/navigation';
import { Dayjs } from 'dayjs';

// Update interface for form data
interface FormData {
    username: string;
    fullname: string;
    email: string;
    password: string;
    phone: string
    role: string;
}


const role = ['User', 'Counterpart'];

export default function CreateCampaign() {
    // Update state initialization
    const [formData, setFormData] = useState<FormData>({
        username: '',
        fullname: '',
        email: '',
        phone: '',
        password: '',
        role: ''
    });
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [quizConfig, setQuizConfig] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const totalAmount = 10;

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleCreateAccount = async () => {
        // Handle campaign creation
        router.push('/users');
    };

    return (
        <PageContainer title="Create Account" description="Create a new account">
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Stack spacing={3}>
                    {/* Image Upload */}
                    <Paper sx={{ p: 2 }}>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            sx={{ width: '100%', height: '100px' }}
                        >
                            Upload Avatar Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </Button>
                    </Paper>

                    {/* Basic Information */}
                    <TextField
                        required
                        fullWidth
                        label="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />

                   <TextField
                        required
                        fullWidth
                        label="Fullname"
                        value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    />

                    <TextField
                        required
                        fullWidth
                        label="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                     <TextField
                        required
                        fullWidth
                        label="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                      <TextField
                        required
                        fullWidth
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    {/* Category Selection */}
                                        <TextField
                                            select
                                            required
                                            fullWidth
                                            label="Role"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        >
                                            {role.map((category) => (
                                                <MenuItem key={category} value={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                    {/* Create Campaign Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleCreateAccount}
                        disabled={!isPaid}
                    >
                        Create Account
                    </Button>
                    
                    
                </Stack>
            </Box>
        </PageContainer>
    );
}