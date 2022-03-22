let client = require('../config/database')

class User {
    constructor(row) {
        this.row = row
    }

    get mail() {
        return this.row.mail_user
    }

    get first_name() {
        return this.row.nom
    }

    get last_name() {
        return this.row.prenom
    }

    get address() {
        return this.row.adresse
    }

    get city() {
        return this.row.ville
    }

    get phone_number() {
        return this.row.telephone
    }

    get gender() {
        return this.row.genre
    }

    get blood_group() {
        return this.row.groupe_sanguin
    }

    get password() {
        return this.row.password_user
    }

    static create(mail_user, nom, prenom, groupe_sanguin, genre, adresse, ville, telephone, password_user, cb) {
        const sql = 'INSERT INTO utilisateur(mail_user, nom, prenom, groupe_sanguin, genre, adresse, ville, telephone, password_user) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *'

        client.query(sql, [mail_user, nom, prenom, groupe_sanguin, genre, adresse, ville, telephone, password_user])
            .then(result => cb(result))
            .catch(e => console.error(e.stack))
    }

    static find (mail_user, cb) {
        const sql = 'SELECT * FROM utilisateur WHERE mail_user = $1'

        client.query(sql, [mail_user])
            .then(result => cb(new User(result.rows[0])))
            .catch(e => console.error(e.stack))
    }
}

module.exports = User
