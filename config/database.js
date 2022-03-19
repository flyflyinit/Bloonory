const { Client } = require('pg')

const client = new Client({
    user: 'theophile',
    host: 'localhost',
    database: 'aws',
    password: 'postgres',
    port: 5432,
})
client.connect()

module.exports = client
