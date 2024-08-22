const config = require('./dbconfig')
const sql = require('mssql')
const axios = require('axios')

const createUser = async (user) => {
    try {
        let pool = await sql.connect(config)

        const query = `INSERT INTO users (name, rank, most_played) VALUES ('${user.name}', '${user.rank}', ${user.most_played})`
        console.log('Executing query:', query)

        await pool.request().query(query)
        console.log('Query executed successfully')
        
        return { success: true }
    } catch (error) {
        console.error('Error creating user:', error)
        return { success: false, error: error.message }
    }
}

const getUsers = async () => {
    let pool = await sql.connect(config)
    let users = pool.request().query('select * from users') 
    return users
}
const getChampions = async () => {
    let pool = await sql.connect(config)
    let users = pool.request().query('select * from champions') 
    return users
}

async function updateUser(user){
    let pool = await sql.connect(config)

        const query = `update users set name = '${user.name}', rank ='${user.rank}', most_played = ${user.most_played} where id = ${user.id}`
        console.log('Executing query:', query)

        await pool.request().query(query)
        console.log('Query executed successfully')
        
        return { success: true }
}

async function deleteUser(userid) {
    try {
      let pool = await sql.connect(config);
  
      const query = 'DELETE FROM users WHERE id = @userId';
      console.log('Executing query:', query);
  
      await pool.request()
        .input('userId', sql.Int, userid)
        .query(query);
  
      console.log('Query executed successfully');
      
      return { success: true };
    } catch (error) {
      console.error('Error executing query:', error);
      return { success: false, error: error.message };
    }
  }

  async function getApiUser(){
    try {
        const response = await axios.get('https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Sik%C3%A1/%23EUW', {
          headers: {
            "X-Riot-Token": "RGAPI-cb921e72-4ce8-49bf-b798-d8ca5f868dc1"
          }
        });
        return json(response.data)
      } catch (error) {
        return status(500).json({ error: error.message });
      }
  }
  
  

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getApiUser,
    getChampions
}