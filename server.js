const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/customers', (req, res) => {
  res.send([
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
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));