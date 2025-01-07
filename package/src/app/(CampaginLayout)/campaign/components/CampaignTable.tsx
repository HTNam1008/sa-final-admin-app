import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton } from '@mui/material';
import { Campaign } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';

interface CampaignTableProps {
  campaigns: Campaign[];
  onDelete: (id: string) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>
              <TableSortLabel>Start Date</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>End Date</TableSortLabel>
            </TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Initial</TableCell>
            <TableCell>Remaining</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.id}</TableCell>
              <TableCell>
                <img
          src={campaign.image || 'https://i.pinimg.com/736x/91/54/1c/91541c77e2a2f6e9331c34c477e9ef4b.jpg'} // Fallback to a default image if `avatar` is empty
          alt="Avatar"
          style={{ width: '50px', height: '40px' }}
        /></TableCell>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.startDate}</TableCell>
              <TableCell>{campaign.endDate}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>{campaign.initial}</TableCell>
              <TableCell>{campaign.remaining}</TableCell>
              <TableCell>{campaign.paid ? '✔️' : '❌'}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => onDelete(campaign.id)} >
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