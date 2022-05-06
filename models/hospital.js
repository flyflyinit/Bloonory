let client = require('../config/database_client')

class Hospital {
    constructor(row) {
        this.row = row
    }

    get hospital_id() {
        return this.row.hospital_id
    }

    get name() {
        return this.row.name
    }

    get address() {
        return this.row.address
    }

    get city() {
        return this.row.city
    }

    get mail() {
        return this.row.mail
    }

    get phone_number() {
        return this.row.phone_number
    }

    static create(name, address, city, mail, phone_number) {
        const sql = 'INSERT INTO hospital(name, address, city, mail, phone_number) VALUES($1, $2, $3, $4, $5) RETURNING *'

        return client.query(sql, [name, address, city, mail, phone_number])
            .then(result => new Hospital(result.rows[0]))
            .catch()
    }

    static find_byID(hospital_id) {
        const sql = 'SELECT * FROM hospital WHERE hospital_id = $1'

        return client.query(sql, [hospital_id])
            .then(result => new Hospital(result.rows[0]))
            .catch()
    }

    static find_by_address(address, city) {
        const sql = 'SELECT * FROM hospital WHERE address = $1 AND city = $2'

        return client.query(sql, [address, city])
            .then(result => new Hospital(result.rows[0]))
            .catch()
    }

    static find_all() {
        const sql = 'SELECT * FROM hospital'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Hospital(res)))
            .catch()
    }
    static delete(name, address) {
        const sql = 'DELETE FROM hospital WHERE name = $1 AND address = $2'

        return client.query(sql, [name, address])
            .then()
            .catch()
    }
}

module.exports = Hospital
