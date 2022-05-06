let client = require('../config/database_client')
const moment = require("moment");

class Comments {
    constructor(row) {
        this.row = row
    }

    get comment_id() {
        return this.row.comment_id
    }

    get text_comment() {
        return this.row.text_comment
    }

    get mail_consumer() {
        return this.row.mail_consumer
    }

    get date_publication() {
        return moment(this.row.date_publication)
    }

    get last_name() {
        return this.row.last_name
    }

    get first_name() {
        return this.row.first_name
    }

    static create(text_comment, mail_consumer) {
        const sql = 'INSERT INTO comment(text_comment, mail_consumer) VALUES($1, $2) RETURNING *'

        return client.query(sql, [text_comment, mail_consumer])
            .then(result => new Comments(result.rows[0]))
            .catch()
    }

    static find_all_and_info_user() {
        const sql = 'SELECT u.last_name, u.first_name, c.text_comment, c.date_publication FROM comment c, consumer u WHERE c.mail_consumer = u.mail_consumer ORDER BY c.date_publication DESC'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Comments(res)))
            .catch()
    }

    static find_all() {
        const sql = 'SELECT * FROM comment'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Comments(res)))
            .catch()
    }
}

module.exports = Comments
