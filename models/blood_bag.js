let client = require('../config/database_client')

class Blood_bag {
    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
    }

    get hospital_id() {
        return this.row.hospital_id
    }

    get blood_group() {
        return this.row.blood_group
    }

    get date_donation() {
        return this.row.date_donation
    }

    get reserved() {
        return this.row.reserved
    }

    static create(id, hospital_id, blood_group, date_donation, reserved) {
        const sql = 'INSERT INTO blood_bag(id, hospital_id, blood_group, date_donation, reserved) VALUES($1, $2, $3, $4, $5) RETURNING *'

        return client.query(sql, [id, hospital_id, blood_group, date_donation, reserved])
            .then(result => new Blood_bag(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find_byID(id) {
        const sql = 'SELECT * FROM blood_bag WHERE id = $1'

        return client.query(sql, [id])
            .then(result => new Blood_bag(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find_all() {
        const sql = 'SELECT * FROM blood_bag'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Blood_bag(res)))
            .catch(e => console.error(e.stack))
    }
}

module.exports = Blood_bag
