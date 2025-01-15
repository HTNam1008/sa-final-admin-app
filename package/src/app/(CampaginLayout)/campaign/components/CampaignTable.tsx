import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton 
} from '@mui/material';
import { Campaign } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';

interface CampaignTableProps {
  searchTerm: string;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ searchTerm }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/events/');
        if (!response.ok) throw new Error('Failed to fetch campaigns');
        const data = await response.json();

        const transformedCampaigns = data.map((item: any) => ({
          id: item.id.toString(),
          image: item.image || 'https://i.pinimg.com/736x/91/54/1c/91541c77e2a2f6e9331c34c477e9ef4b.jpg',
          name: item.name,
          startDate: item.start,
          endDate: item.endDate,
          status: 'PENDING',
          initial: item.vouchers.reduce((sum: number, voucher: any) => sum + voucher.initQuantity, 0),
          remaining: item.vouchers.reduce((sum: number, voucher: any) => sum + voucher.currentQuantity, 0),
          paid: true,
        }));
        setCampaigns(transformedCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    console.log('Delete campaign:', id);
    // Implement delete logic
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Initial</TableCell>
            <TableCell>Remaining</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.id}</TableCell>
              <TableCell>
                <img
                  src={campaign.image}
                  alt="Avatar"
                  style={{ width: '50px', height: '40px' }}
                />
              </TableCell>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.startDate}</TableCell>
              <TableCell>{campaign.endDate}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>{campaign.initial}</TableCell>
              <TableCell>{campaign.remaining}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDelete(campaign.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampaignTable;
