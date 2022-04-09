let client = require('../config/database_client')

class Admin {
    constructor(row) {
        this.row = row
    }

    get mail_admin() {
        return this.row.mail_admin
    }

    get last_name() {
        return this.row.last_name
    }

    get first_name() {
        return this.row.first_name
    }

    get phone_number() {
        return this.row.phone_number
    }

    get password_admin() {
        return this.row.password_admin
    }

    static create(mail_admin, last_name, first_name, phone_number, password_admin) {
        const sql = 'INSERT INTO admin(mail_admin, last_name, first_name, phone_number, password_admin) VALUES($1, $2, $3, $4, $5) RETURNING *'

        return client.query(sql, [mail_admin, last_name, first_name, phone_number, password_admin])
            .then(result => new Admin(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find_byMail(mail_admin) {
        const sql = 'SELECT * FROM admin WHERE mail_admin = $1'

        return client.query(sql, [mail_admin])
            .then(result => new Admin(result.rows[0]))
            .catch(e => console.error(e.stack))
    }
}

module.exports = Admin
