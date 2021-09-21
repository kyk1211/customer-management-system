import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import React, { useEffect, useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchAppBar from './components/SearchAppBar';

const styles = (theme) => ({
  root: {
    width: '100%',
    minWidth: 1080,
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2),
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
});

function App({ classes }) {
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchKey, setSearchKey] = useState("");

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
  
  const stateRefresh = () => {
    setCompleted(0);
    setSearchKey("");
    callApi()
      .then((res) => setCustomers([...res]))
      .catch((err) => console.log(err));
  };

  const handleValueChange = (e) => {
    setSearchKey(e.target.value);
  };

  const filteredData = (data) => {
    data = data.filter(c => {
      return c.name.indexOf(searchKey) > -1;
    });
    return data.map(c => {
      return <Customer stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birth={c.birth} sex={c.sex} job={c.sex} />
    });
  };

  const cellList = ['번호', '프로필 이미지', '이름', '생년월일', '성별', '직업', '설정'];

  return (
    <div className={classes.root}>
      <SearchAppBar handleValueChange={handleValueChange} searchKey={searchKey}/>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              {cellList.map((cell) => <TableCell className={classes.tableHead}>{cell}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded ? 
              filteredData(customers) : 
              <TableRow>
                <TableCell colSpan='6' align='center'>
                  <CircularProgress className={classes.progress} variant="determinate" value={completed} />
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(App);
