import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createTheme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif'
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

