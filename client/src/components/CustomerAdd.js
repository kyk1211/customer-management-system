import React, { useState } from "react";
import axios from 'axios';

const CustomerAdd = ({ stateRefresh }) => {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState("");


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

  return (
    <form onSubmit={handleFormSubmit} >
      <h1>고객 추가</h1>
      프로필 이미지: <input 
        type='file' 
        name='file' 
        file={file} 
        value={fileName}
        onChange={handleFileChange} /><br/>
      이름: <input 
        type="text" 
        name="userName" 
        value={userName} 
        onChange={handleValueChange} /><br/>
      생년월일: <input
        type="text"
        name="birth"
        value={birth}
        onChange={handleValueChange} /><br/>
      성별: <input
        type='text'
        name="sex"
        value={sex}
        onChange={handleValueChange} /><br/>
      직업: <input
        type='text'
        name="job"
        value={job}
        onChange={handleValueChange} /><br/>
      <button type='submit'>추가하기</button>
    </form>
  )
};

export default CustomerAdd;