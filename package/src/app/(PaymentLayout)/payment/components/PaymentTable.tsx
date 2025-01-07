import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton, Typography } from '@mui/material';
import { Payment } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';

interface PaymentTableProps {
  payments: Payment[];
  onDelete: (id: string) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">ID</Typography></TableCell>
            <TableCell><Typography variant="h6">AccountID</Typography></TableCell>
            <TableCell><Typography variant="h6">Campaign</Typography></TableCell>
            <TableCell><Typography variant="h6">Total Fee</Typography></TableCell>
            <TableCell><Typography variant="h6">Status</Typography></TableCell>
            <TableCell>
              <TableSortLabel><Typography variant="h6">Date</Typography></TableSortLabel>
            </TableCell>
            <TableCell><Typography variant="h6">Action</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{payment.accountID}</TableCell>
              <TableCell>{payment.campaign}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>{payment.totalFee}</TableCell>
              <TableCell>
                <IconButton color='error' onClick={() => onDelete(payment.id)}>
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

export default PaymentTable;