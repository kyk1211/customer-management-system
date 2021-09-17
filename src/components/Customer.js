import React from 'react';

const Customer = ({ id, img, name, birth, sex, job }) => {
  return (
    <div>
      <CustomerProfile id={id} img={img} name={name} />
      <CustomerInfo birth={birth} sex={sex} job={job} />
    </div>
  );
};

const CustomerProfile = ({ name ,img, id }) => {
  return (
    <>
      <img src={img} alt='profile' />
      <h2>{name}({id})</h2>
    </>
  );
};

const CustomerInfo = ({ birth, sex, job }) => {
  return (
    <>
      <p>{birth}</p>
      <p>{sex}</p>
      <p>{job}</p>
    </>
  );
};

export default Customer;