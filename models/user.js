let client = require('../config/database_client')

class User {
    constructor(row) {
        this.row = row
    }

    get mail_consumer() {
        return this.row.mail_consumer
    }

    get last_name() {
        return this.row.last_name
    }

    get first_name() {
        return this.row.first_name
    }

    get address() {
        return this.row.address
    }

    get city() {
        return this.row.city
    }

    get phone_number() {
        return this.row.phone_number
    }

    get gender() {
        return this.row.gender
    }

    get blood_group() {
        return this.row.blood_group
    }

    get password_user() {
        return this.row.password_user
    }

    static create(mail_consumer, last_name, first_name, blood_group, gender, address, city, phone_number, password_user) {
        const sql = 'INSERT INTO consumer(mail_consumer, last_name, first_name, blood_group, gender, address, city, phone_number, password_user) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *'

        return client.query(sql, [mail_consumer, last_name, first_name, blood_group, gender, address, city, phone_number, password_user])
            .then(result => new User(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find(mail_consumer) {
        const sql = 'SELECT * FROM consumer WHERE mail_consumer = $1'

        return client.query(sql, [mail_consumer])
            .then(result => new User(result.rows[0]))
            .catch(e => console.error(e.stack))
    }
}

module.exports = User
