const mysql = require('mysql');
const secret = require('./../secrets.json');
class Model {
    constructor(){
        this.connection = mysql.createConnection({
            host: secret.host,
            database: secret.db,
            user: secret.user,
            password: secret.password
        })
        this.name = this.constructor.name.toLowerCase();  // This relates to the Class name of the model.
    }

    // Return all the records from a table.
    findAll(){
        this.connection.query(`SELECT * FROM ${this.name};`, function(error, results, fields){
            if(error) throw error;
            console.log(results);
        })
    }

    // Return the first record from a table.
    first(){
        this.connection.query(`SELECT * FROM ${this.name} ORDER BY id ASC LIMIT 1;`, function(error, result, fields){
            if(error) throw error;
            console.log(result);
        })
    }

    // Return the last record from a table.
    last(){
        this.connection.query(`SELECT * FROM ${this.name} ORDER BY id DESC LIMIT 1;`, function(error, result, fields){
            if(error) throw error;
            console.log(result);
        })
    }

    // Return any record that meets the query params.
    find(options){
        // Parse the keys in the options object and generate a string to be appended to the query string.
        let options_query_string = "";
        Object.keys(options).forEach((option, index) => {
            if( index === 0){
                options_query_string = `${option} = '${options[option]}'`;
            } else {
                options_query_string += ` AND ${option} = '${options[option]}'`;
            }
        })

        this.connection.query(`SELECT * FROM ${this.name} WHERE ${options_query_string};`, function(error, results, fields){
            if (error) throw error;
            console.log(results);
        })
    }
}

module.exports = Model;