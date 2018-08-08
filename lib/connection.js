const mysql = require('mysql');

class Connection {
    constructor(config){
        this.connection = mysql.createConnection(config);
    }

    query(sql, args){
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    resolve(results)
                }
            })
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if(err){
                    return reject(err);
                }else{
                    resolve();
                }
            })
        })
    }
}

module.exports = Connection;