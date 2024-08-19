import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

function App() {

  const [user, setUser] = useState({
    name: '',
    rank: '',
    most_played: 0,
  })

  const setInput = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function fetchData() {
    const newData = await fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    console.log(newData)
  }
  

  return (
    <div>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={setInput}
        placeholder="Name"
      />
      <input
        type="text"
        name="rank"
        value={user.rank}
        onChange={setInput}
        placeholder="Rank"
      />
      <input
        type="number"
        name="most_played"
        value={user.most_played}
        onChange={setInput}
        placeholder="Most Played"
      />
      <button onClick={fetchData}>Submit</button>
    </div>
  );
}

export default App;
