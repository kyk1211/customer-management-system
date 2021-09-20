import React from "react";

const CustomerDel = ({ id, stateRefresh }) => {

  const delCustomer = (id) => {
    const url = './api/customers/' + id;
    fetch(url, {
      method: 'DELETE'
    });
    stateRefresh();
  };

  return (
    <button onClick={(e) => delCustomer(id)}>삭제</button>
  )
}

export default CustomerDel;