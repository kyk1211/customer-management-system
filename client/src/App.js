import Customer from './components/Customer';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing(2),
  },
});

function App({ classes }) {
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCompleted((prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 1));
    }, 80);
    callApi()
      .then((res) => setCustomers([...res]))
      .catch((err) => console.log(err));
    return () => {
      clearInterval(timer);
    };
  }, []);

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    setIsLoaded(true);
    return body;
  };

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
          {isLoaded ? 
            customers.map((customer) => {
              return (<Customer 
                key={customer.id} 
                id={customer.id} 
                name={customer.name} 
                img={customer.img} 
                sex={customer.sex} 
                job={customer.job} 
                birth={customer.birth} 
              />)
            }) : 
            <TableRow>
              <TableCell colSpan='6' align='center'>
                <CircularProgress className={classes.progress} variant="determinate" value={completed} />
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
