const {Pool, Client} = require('pg')
const connectionString = `postgressql://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`

const conn = new Client({
  connectionString: connectionString
})

conn.connect()

// const query = `
//   CREATE TABLE art (
//     id serial PRIMARY KEY,
//     name VARCHAR (50) NOT NULL,
//     artist VARCHAR (50) NOT NULL,
//     description VARCHAR (100) NOT NULL,
//     width serial NOT NULL,
//     height serial NOT NULL,
//     create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   )
// `

// const query = `DROP TABLE art`

// conn.query(query, (err, data) => {
//   if(err) console.error(err)
//   else console.log(data)
// })

module.exports = conn
