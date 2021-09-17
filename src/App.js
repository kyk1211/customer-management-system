import Customer from './components/Customer';

const customers = [
{
  id: 1,
  img: 'https://placeimg.com/64/64/any',
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

function App() {
  return (
    <>
      {
        customers.map((customer) => (
            <Customer
              key={customer.id}
              id={customer.id}
              name={customer.name}
              img={customer.img}
              sex={customer.sex}
              job={customer.job}
            />
          )
        )
      }
    </>
  );
}

export default App;
