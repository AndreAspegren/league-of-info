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

  const [Sika, setSika] = useState(null)

  // async function getSummonerByName() {
  //   const response = await fetch('http://localhost:5000/leagueapi', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     }
  //   })

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`)
  //   }
  //   const usersData = await response.json()
  //   setUsers(usersData.recordset)
  // }

  // useEffect(() => {
  //   getSummonerByName()
  // }, [])

  const [users, setUsers] = useState([]) 

  const [updatei, makeUpdate] = useState()

  async function updateUpdate(i){
    
    if (i != updatei){
      setUpdate({
        name: '',
        rank: '',
        most_played: 0,
      });
    }
    makeUpdate(i)
  }

  const userInput = (event) => {
    const { name, value } = event.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const [update, setUpdate] = useState({
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

  const [champions, setChampions] = useState([]);

  async function pullChampions() {
    try {
      const response = await fetch('http://localhost:5000/champions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json()
      console.log(data.recordset)
      setChampions(data.recordset)
    } catch (error) {
      console.error('Error fetching champions:', error);
    }
  }

  useEffect(() => {
    pullChampions();
  }, []);

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
  


  return (
    <div>
      <div>Legg til Bruker</div>
      <div>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={userInput}
          placeholder="Name"
        />
        <input
          type="text"
          name="rank"
          value={user.rank}
          onChange={userInput}
          placeholder="Rank"
        />
        <input
          type="number"
          name="most_played"
          value={user.most_played}
          onChange={userInput}
          placeholder="Most Played"
        />
        <button onClick={fetchData}>Legg til bruker</button>
        <div>
      {updatei == null ? null : (
        <div>
          <div>{`Rediger ${users[updatei].name}`}</div>
          <input name="name" type="text" placeholder="Name"value={update.name} onChange={updateInput} />
          <input name="rank" type="text" placeholder="Rank"value={update.rank} onChange={updateInput}/>
          <input name="most_played" type="number" placeholder="Most Played"value={update.most_played} onChange={updateInput}/>
          <button onClick={updateUser}>{`Oppdater ${users[updatei].name}`}</button>
        </div>
      )}
    </div>
        <div>Alle brukere: </div>
        {users.map((user, i) => (
          <div key={user.id} style={{ display: 'flex' }}>
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.rank}</div>
            <div>{user.most_played != null ? champions[user.most_played].name : ''}</div>
            <button onClick={() => updateUpdate(i)}>Rediger</button>
            <button onClick={() => deleteUser(i)}>Slett</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
