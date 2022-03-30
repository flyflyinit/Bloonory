let client = require('../config/database_client')
let moment = require('../config/moment')

class Comments {
    constructor(row) {
        this.row = row
    }

    get commentaire_id() {
        return this.row.commentaire_id
    }

    get texte() {
        return this.row.texte
    }

    get mail_user() {
        return this.row.mail_user
    }

    get date_publication() {
        return moment(this.row.date_publication)
    }

    get nom() {
        return this.row.nom
    }

    get prenom() {
        return this.row.prenom
    }

    static create(texte, mail_user) {
        const sql = 'INSERT INTO commentaire(texte, mail_user) VALUES($1, $2) RETURNING *'

        return client.query(sql, [texte, mail_user])
            .then(result => new Comments(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find_all_and_info_user() {
        const sql = 'SELECT u.nom, u.prenom, c.texte, c.date_publication FROM commentaire c, utilisateur u WHERE c.mail_user = u.mail_user ORDER BY c.date_publication DESC'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Comments(res)))
            .catch(e => console.error(e.stack))
    }

    static find_all() {
        const sql = 'SELECT * FROM commentaire'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Comments(res)))
            .catch(e => console.error(e.stack))
    }
}

module.exports = Comments
