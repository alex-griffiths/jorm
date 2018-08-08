const secret = require('./../secrets.json');
const Connection = require("./connection");
class Model {
    constructor(){
        this.connection = new Connection(secret);
        this.name = this.constructor.name.toLowerCase();  // This relates to the Class name of the model.
    }

    // Return a promise with the records from the table.
    findAll(){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.name};`).then( results => {
                // const results_json = {};

                // results.forEach(result => {
                //     results_json[result.id] = {
                //     }
                // })
                resolve(results);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    // Return the first record from a table.
    first(){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.name} ORDER BY id ASC LIMIT 1;`).then(result => {
                resolve(result);
            }).catch(err => {
                return reject(err);
            })

        })
    }

    // Return the last record from a table.
    last(){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.name} ORDER BY id DESC LIMIT 1;`).then(result => {
                resolve(result);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    // Return any record that meets the query params.
    find(options){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.name} WHERE ?`, options).then(result => {
                resolve(result);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = Model;