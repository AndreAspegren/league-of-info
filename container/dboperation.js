const config = require('./dbconfig')
const sql = require('mssql')

const getUsers = async () => {
    let pool = await sql.connect(config)
    let users = pool.request().query('select * from users')
    console.log(users)
    return users
}
const addInputs = (request, params) => {
    for (const [key, { type, value }] of Object.entries(params)) {
        request.input(key, type, value);
    }
    return request;
};

const createUser = async (user) => {
    try {
        let pool = await sql.connect(config);

        const query = `INSERT INTO users (name, rank, most_played) VALUES ('${user.name}', '${user.rank}', ${user.most_played})`;
        console.log('Executing query:', query);

        await pool.request().query(query);
        console.log('Query executed successfully');
        
        return { success: true };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: error.message };
    }
};
  

module.exports = {
    getUsers,
    createUser
}