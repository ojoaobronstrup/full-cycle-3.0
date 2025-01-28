const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
const port = 8081

const connection = mysql.createPool({
  host: 'fullcycle-banco',
  user: 'root',
  password: 'fullcycle',
  database: 'people'
})

app.get('/', async (req, res) => {
  try {
    await connection.query("INSERT INTO people(name) VALUES('joao')")

    const people = await connection.query('SELECT * FROM people')

    const names = people[0].map(person => person.name)

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <h4> Lista de nomes cadastrada no banco de dados:</h4>
      <p>${names.join(', ')}</p>
    `)
  } catch(e) {
    console.error(e)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})