let client = require('../config/database_client')

class Hospital {
    constructor(row) {
        this.row = row
    }

    get hopital_id() {
        return this.row.hopital_id
    }

    get nom() {
        return this.row.nom
    }

    get adresse() {
        return this.row.adresse
    }

    get ville() {
        return this.row.ville
    }

    get mail() {
        return this.row.mail
    }

    get telephone() {
        return this.row.telephone
    }

    static create(nom, adresse, ville, mail, telephone) {
        const sql = 'INSERT INTO hopital(nom, adresse, ville, mail, telephone) VALUES($1, $2, $3, $4, $5) RETURNING *'

        return client.query(sql, [nom, adresse, ville, mail, telephone])
            .then(result => new Hospital(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find_byID(hopital_id) {
        const sql = 'SELECT * FROM utilisateur WHERE hopital_id = $1'

        return client.query(sql, [hopital_id])
            .then(result => new Hospital(result.rows[0]))
            .catch(e => console.error(e.stack))
    }

    static find_all() {
        const sql = 'SELECT * FROM utilisateur'

        return client.query(sql, [])
            .then(result => result.rows.map(res => new Hospital(res)))
            .catch(e => console.error(e.stack))
    }
}

module.exports = Hospital
