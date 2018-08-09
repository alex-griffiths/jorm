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
                const results_array = new Array();
                results.forEach(result => {
                    const stringified_result = JSON.stringify(result);
                    results_array.push(JSON.parse(stringified_result));
                })
                resolve(results_array);
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
    find(args){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.name} WHERE ?`, args).then(result => {
                const results_array = new Array();
                result.forEach(r => {
                    const stringified_result = JSON.stringify(r);
                    results_array.push(JSON.parse(stringified_result));
                })
                resolve(results_array);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    create(args){
        return new Promise((resolve, reject) => {
            this.connection.query(`INSERT INTO ${this.name} SET ?`, args).then(result => {
                resolve(result);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = Model;