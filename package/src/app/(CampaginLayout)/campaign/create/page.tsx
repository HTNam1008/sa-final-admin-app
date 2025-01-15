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
    name: string;
    initialVouchers: number;
    category: string;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    description: string;
}


const categories = ['Food', 'Music', 'Restaurant', 'Car', 'Shopping', 'Drink'];

interface VoucherType {
    quantity: number;
    discount: number;
}

export default function CreateCampaign() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        initialVouchers: 0,
        category: '',
        startDate: null,
        endDate: null,
        description: '',
      });
    
      const router = useRouter();
      const [image, setImage] = useState<File | null>(null);
      const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>([]);
      const [expandVouchers, setExpandVouchers] = useState(false);
      const [isPaid, setIsPaid] = useState(false);
    
      const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
          setImage(event.target.files[0]);
        }
      };
    
      const handleAddVoucherType = () => {
        setVoucherTypes([...voucherTypes, { quantity: 0, discount: 0 }]);
      };
    
      const handleCreateCampaign = async () => {
        try {
          // Prepare vouchers for the request body
          const vouchers = voucherTypes.map((voucher, index) => ({
            code: `CODE-${index + 1}`,
            qr: `https://example.com/qr/code-${index + 1}`,
            image: `https://example.com/images/voucher-${index + 1}.png`,
            price: voucher.discount, // Example static price
            description: `Discount Voucher ${index + 1}`,
            expired: formData.endDate?.toISOString() || '', // Expiry date from the form
            status: 'ACTIVE',
            initQuantity: voucher.quantity,
            currentQuantity: voucher.quantity,
          }));
    
          // Prepare the request body
          const requestBody = {
            name: formData.name,
            start: formData.startDate?.toISOString() || '',
            endDate: formData.endDate?.toISOString() || '',
            vouchers: vouchers.length > 0 ? vouchers : undefined, // Include vouchers only if they exist
          };
    
          // API call to create the campaign
          const response = await fetch('http://localhost:8082/api/events/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
          });
    
          if (!response.ok) {
            throw new Error(`Failed to create campaign: ${response.statusText}`);
          }
    
          console.log('Campaign created successfully');
          router.push('/campaign');
        } catch (error) {
          console.error('Error creating campaign:', error);
        }
      };

      return (
        <PageContainer title="Create Campaign" description="Create a new campaign">
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
                  Upload Campaign Image
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
                label="Campaign Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
    
              {/* Voucher Types Expansion */}
              <Paper sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">Voucher Types</Typography>
                  <IconButton onClick={() => setExpandVouchers(!expandVouchers)}>
                    <ExpandMoreIcon />
                  </IconButton>
                </Stack>
                <Collapse in={expandVouchers}>
                  {voucherTypes.map((type, index) => (
                    <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Quantity"
                          value={type.quantity}
                          onChange={(e) => {
                            const newTypes = [...voucherTypes];
                            newTypes[index].quantity = Number(e.target.value);
                            setVoucherTypes(newTypes);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Discount (%)"
                          value={type.discount}
                          onChange={(e) => {
                            const newTypes = [...voucherTypes];
                            newTypes[index].discount = Number(e.target.value);
                            setVoucherTypes(newTypes);
                          }}
                        />
                      </Grid>
                    </Grid>
                  ))}
                  <Button sx={{ mt: 2 }} onClick={handleAddVoucherType}>
                    Add Voucher Type
                  </Button>
                </Collapse>
              </Paper>
    
              {/* Date Selection */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={2}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(newValue) => setFormData({ ...formData, startDate: newValue })}
                  />
                  <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(newValue) => setFormData({ ...formData, endDate: newValue })}
                  />
                </Stack>
              </LocalizationProvider>
    
              {/* Create Campaign Button */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCreateCampaign}
              >
                Create Campaign
              </Button>
            </Stack>
          </Box>
        </PageContainer>
      );
}