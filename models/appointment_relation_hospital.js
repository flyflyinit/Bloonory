let client = require('../config/database_client')
const moment = require("moment");


class Appointment_relation_hospital {
    constructor(row) {
        this.row = row
    }

    get mail_consumer() {
        return this.row.mail_consumer
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

    get date_appointment() {
        return moment(this.row.date_appointment)
    }

    get dates() {
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

    static find(mail_consumer, status) {
        const sql = 'SELECT * FROM appointment a, hospital h WHERE a.mail_consumer = $1 AND a.status = $2 AND a.hospital_id = h.hospital_id'

        return client.query(sql, [mail_consumer, status])
            .then(result => result.rows.map(res => new Appointment_relation_hospital(res)))
            .catch(e => console.error(e.stack))
    }
}

module.exports = Appointment_relation_hospital
