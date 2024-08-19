const config = require('./dbconfig')
const sql = require('mssql')

const getUsers = async () => {
    let pool = await sql.connect(config)
    let users = pool.request().query('select * from users')
    console.log(users)
    return users
}
const createUser = async (user) => {
    try {
      let pool = await sql.connect(config)
  
      let id = 6
        console.log(id, user)
        await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, user.name)
        .input('rank', sql.NVarChar, user.rank)
        .input('most_played', sql.Int, user.mostPlayed)
        .query(`
            INSERT INTO users (id, name, rank, most_played) 
            VALUES (@id, @name, @rank, @most_played)
        `);
  
      console.log(user)
      return { success: true }
    } catch (error) {
      console.error('Error creating user:', error)
      return { success: false, error: error.message }
    }
  }
  

module.exports = {
    getUsers,
    createUser
}