import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton } from '@mui/material';
import { Account } from '../types';

interface AccountTableProps {
  accounts: Account[];
  onDelete: (id: string) => void;
}

const AccountTable: React.FC<AccountTableProps> = ({ accounts, onDelete }) => {
  return (
    <Paper 
      elevation={3} 
      style={{ margin: '20px', borderRadius: '8px', overflow: 'hidden' }}
    >
      <TableContainer style={{
          border: '1px solid #ccc', 
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>
              <TableSortLabel>Full name</TableSortLabel>
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>
              <TableSortLabel>Role</TableSortLabel>
            </TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.username}</TableCell>
              <TableCell>{account.fullname}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.password}</TableCell>
              <TableCell>{account.phone}</TableCell>
              <TableCell>{account.role}</TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'middle' }}>{account.active ? '✔️' : '❌'}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(account.id)}>
                  🗑️
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default AccountTable;