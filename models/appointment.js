let client = require('../config/database_client')

class Appointment {
    constructor(row) {
        this.row = row
    }

    get mail_user() {
        return this.row.mail_user
    }

    get hopital_id() {
        return this.row.hopital_id
    }

    get date_rdv() {
        return this.row.date_rdv
    }

    get type_rdv() {
        return this.row.type_rdv
    }

    get status() {
        return this.row.status
    }

    get information() {
        return this.row.information
    }

    static create(mail_user, hopital_id, date_rdv, type_rdv, status, information) {
        const sql = 'INSERT INTO rendez_vous(mail_user, hopital_id, date_rdv, type_rdv, status, information) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'

        return client.query(sql, [mail_user, hopital_id, date_rdv, type_rdv, status, information])
            .then(result => new Appointment(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find_byUser(mail_user) {
        const sql = 'SELECT * FROM rendez_vous WHERE mail_user = $1'

        return client.query(sql, [mail_user])
            .then(result => result.rows.map(res => new Appointment(res)))
            .catch(e => console.error(e.stack))
    }

    static find_all() {
        const sql = 'SELECT * FROM rendez_vous'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Appointment(res)))
            .catch(e => console.error(e.stack))
    }
}

module.exports = Appointment
