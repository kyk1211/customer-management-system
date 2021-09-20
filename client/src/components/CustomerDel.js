import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

const CustomerDel = ({ id, stateRefresh }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const delCustomer = (id) => {
    const url = './api/customers/' + id;
    fetch(url, {
      method: 'DELETE'
    });
    stateRefresh();
  };

  return (
    <>
      <Button variant='contained' color="secondary" onClick={handleClickOpen}>삭제</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle onClose={handleClose}>
          삭제 경고
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            선택한 고객 정보가 삭제됩니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={(e) => delCustomer(id)}>삭제</Button>
          <Button variant="contained" color="primary" onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CustomerDel;