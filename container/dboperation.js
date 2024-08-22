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


module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getChampions,
}

