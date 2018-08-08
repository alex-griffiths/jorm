const Model = require('./lib/model');

class Test extends Model{
    constructor(){
        super();
    }
}

const person = new Test;

person.findAll().then(results => {
    console.log(results);
}).catch(err => {
    throw err;
});

// person.first().then(result => {
//     console.log(result);
// }).catch(err => {
//     throw err;
// })

// person.last().then(result => {
//     console.log(result);
// }).catch(err => {
//     throw err;
// })

// person.find({
//     name: "Tim",
//     name: "Alex"
// }).then(result => {
//     console.log(result);
// }).catch(err => {
//     throw err;
// })

person.connection.close();