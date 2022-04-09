let client = require('../config/database_client')

class Appointment {
    constructor(row) {
        this.row = row
    }

    get mail_consumer() {
        return this.row.mail_consumer
    }

    get hospital_id() {
        return this.row.hospital_id
    }

    get date_appointment() {
        return this.row.date_appointment
    }

    get type_appointment() {
        return this.row.type_appointment
    }

    get status() {
        return this.row.status
    }

    get information() {
        return this.row.information
    }

    static create(mail_consumer, hospital_id, date_appointment, type_appointment, status, information) {
        const sql = 'INSERT INTO appointment(mail_consumer, hospital_id, date_appointment, type_appointment, status, information) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'

        return client.query(sql, [mail_consumer, hospital_id, date_appointment, type_appointment, status, information])
            .then(result => new Appointment(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find_byUser(mail_consumer) {
        const sql = 'SELECT * FROM appointment WHERE mail_consumer = $1'

        return client.query(sql, [mail_consumer])
            .then(result => result.rows.map(res => new Appointment(res)))
            .catch(e => console.error(e.stack))
    }

    static find_all() {
        const sql = 'SELECT * FROM appointment'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Appointment(res)))
            .catch(e => console.error(e.stack))
    }
}

module.exports = Appointment
