import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDel from './CustomerDel';

const Customer = ({ id, image, name, birth, sex, job, stateRefresh }) => {
  return (
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell><img src={image} alt='Profile' style={{width: '64px', height: '64px'}} /></TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{birth}</TableCell>
        <TableCell>{sex}</TableCell>
        <TableCell>{job}</TableCell>
        <TableCell><CustomerDel id={id} stateRefresh={stateRefresh} /></TableCell>
      </TableRow>
  );
};


export default Customer;