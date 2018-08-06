const mysql = require('mysql');
const secret = require('./../secrets.json');
class Model {
    constructor(){
        this.connection = mysql.createConnection({
            host: secret.host,
            user: secret.user,
            password: secret.password,
            database: secret.db
        })
    }

    findAll(){

    }
}

module.exports = Model;