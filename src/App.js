import Customer from './components/Customer';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080,
  }
})

const customers = [
{
  id: 1,
  img: 'https://placeimg.com/64/64/0',
  name: 'kkk',
  birth: 961211,
  sex: 'male',
  job: 'free'
},
{
  id: 2,
  img: 'https://placeimg.com/64/64/1',
  name: 'yyy',
  birth: 981104,
  sex: 'female',
  job: 'student'
},
{
  id: 3,
  img: 'https://placeimg.com/64/64/2',
  name: 'zzz',
  birth: 950405,
  sex: 'male',
  job: 'student'
}
];

function App(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (<Customer key={customer.id} id={customer.id} name={customer.name} img={customer.img} sex={customer.sex} job={customer.job} birth={customer.birth} />))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
