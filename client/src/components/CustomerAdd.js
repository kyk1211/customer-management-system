import React, { useState } from "react";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  hidden: {
    display: 'none'
  }
});

const CustomerAdd = ({ classes, stateRefresh }) => {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer()
      .then((res) => {
        console.log(res.data);
        stateRefresh();
      });
    setFile(null);
    setUserName("");
    setBirth("");
    setSex("");
    setJob("");
    setFileName("");
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  };


  const handleValueChange = (e) => {
    switch (e.target.name) {
      case 'userName':
        setUserName(e.target.value);
        break;
      case 'birth':
        setBirth(e.target.value);
        break;
      case 'sex':
        setSex(e.target.value);
        break;
      case 'job':
        setJob(e.target.value);
        break;
      default:
        console.log(e.target.name);
        break;
    }
  };

  const addCustomer = async () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', userName);
    formData.append('birth', birth);
    formData.append('sex', sex);
    formData.append('job', job);
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return await axios.post(url, formData, config);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFile(null);
    setUserName("");
    setBirth("");
    setSex("");
    setJob("");
    setFileName("");
    setOpen(false);
  };

  return (
    <>
      <Button variant='contained' color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input className={classes.hidden} accept="image/*" id="raised-button-file" type='file' value={fileName} onChange={handleFileChange}/>
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="primary" component="span" name="file">
              {fileName === "" ? "프로필 이미지 선택" : fileName}
            </Button>
          </label>
          <br/>
          <TextField
            label='이름'
            type="text" 
            name="userName" 
            value={userName} 
            onChange={handleValueChange} /><br/>
          <TextField
            label='생년월일'
            type="text"
            name="birth"
            value={birth}
            onChange={handleValueChange} /><br/>
          <TextField
            label='성별'
            type='text'
            name="sex"
            value={sex}
            onChange={handleValueChange} /><br/>
          <TextField
            label='직업'
            type='text'
            name="job"
            value={job}
            onChange={handleValueChange} /><br/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default withStyles(styles)(CustomerAdd);