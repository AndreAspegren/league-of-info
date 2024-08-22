import logo from './logo.svg'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios';


function App() {
  const [user, setUser] = useState({
    name: '',
    rank: '',
    most_played: 0,
  })

  const [users, setUsers] = useState([]) 

  const [updatei, makeUpdate] = useState()

  const [champions, setChampions] = useState([])

  async function updateUpdate(i){
    if (i != updatei){
      setUpdate({
        id: 0,
        name: '',
        rank: '',
        most_played: 0,
      })
      makeUpdate(i)
    }
    else makeUpdate(null)
  }

  const userInput = (event) => {
    const { name, value } = event.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const [update, setUpdate] = useState({
    id: 0,
    name: '',
    rank: '',
    most_played: 0,
  });


  const updateInput = (event) => {
    const { name, value } = event.target;
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: value,
    }));
  };

  async function fetchData() {
    const newData = await fetch('http://localhost:5000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
    await pullUsers()
  }

  async function pullUsers() {
    const response = await fetch('http://localhost:5000/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const usersData = await response.json()
    setUsers(usersData.recordset)
  }

 

  async function pullChampions() {
    try {
      const response = await fetch('http://localhost:5000/champions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data.recordset)
      setChampions(data.recordset)
    } catch (error) {
      console.error('Error fetching champions:', error)
    }
  }

  async function updateUser(){
    const newData = await fetch('http://localhost:5000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        id: users[updatei].id,
        name: update.name,
        rank: update.rank,
        most_played: update.most_played
      })
    }).then(res => res.json())
    await pullUsers()
  }

  async function deleteUser(i){
    if (users[i].id == users[updatei].id) {
      setUpdate({
        id: 0,
        name: '',
        rank: '',
        most_played: 0,
      })
      makeUpdate(null)
    }
    const newData = await fetch('http://localhost:5000/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ id: users[i].id })
    }).then(res => res.json())
    await pullUsers()
  }

  useEffect(() => {
    pullUsers()
  }, [])
  
  useEffect(() => {
    pullChampions()
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', overflowY: 'auto' }}>
      <div style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1, padding: '1rem', borderBottom: '1px solid gold', paddingTop: '20vh' }}>
        <div>Legg til Bruker</div>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={userInput}
          placeholder="Name"
        />
<select
  name="rank"
  value={user.rank}
  onChange={userInput}
  placeholder="Rank"
>
  <option value="" disabled>Select Rank</option>
  <option value="Iron">Iron</option>
  <option value="Bronze">Bronze</option>
  <option value="Silver">Silver</option>
  <option value="Gold">Gold</option>
  <option value="Platinum">Platinum</option>
  <option value="Diamond">Diamond</option>
  <option value="Master">Master</option>
  <option value="Grandmaster">Grandmaster</option>
  <option value="Challenger">Challenger</option>
</select>
        <input
          type="number"
          name="most_played"
          value={user.most_played}
          onChange={userInput}
          placeholder="Most Played"
        />
        <button onClick={fetchData}>Legg til bruker</button>
      </div>
  
      {updatei == null ? null : (
        <div>
          <div>{`Rediger ${users[updatei].name}`}</div>
          <input name="name" type="text" placeholder="Name"value={update.name} onChange={updateInput} />
          <select
  name="rank"
  value={user.rank}
  onChange={updateInput}
  placeholder="Rank"
>
  <option value="" disabled>Select Rank</option>
  <option value="Iron">Iron</option>
  <option value="Bronze">Bronze</option>
  <option value="Silver">Silver</option>
  <option value="Gold">Gold</option>
  <option value="Platinum">Platinum</option>
  <option value="Diamond">Diamond</option>
  <option value="Master">Master</option>
  <option value="Grandmaster">Grandmaster</option>
  <option value="Challenger">Challenger</option>
</select>
          <input name="most_played" type="number" placeholder="Most Played"value={update.most_played} onChange={updateInput}/>
          <button onClick={updateUser}>{`Oppdater ${users[updatei].name}`}</button>
        </div>
      )}
      <div>
        <div>Alle brukere: </div>
        {users.map((user, i) => (
          <div key={user.id} style={{ display: 'flex', gap: '3vw', alignItems: 'center', padding: '0.5rem 0' }}>
            <div>ID: {user.id}</div>
            <div>Navn: {user.name}</div>
            <div>Rank: {user.rank}</div>
            <div>Mest Spilte Champion: {user.most_played === null ? '' : champions == null ? '' : champions[user.most_played - 1].name}</div>
            <button onClick={() => updateUpdate(i)}>Rediger</button>
            <button onClick={() => deleteUser(i)}>Slett</button>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default App

