const Model = require('./lib/model');

class Test extends Model{
    constructor(){
        super();
    }
}

const person = new Test;

person.findAll();

person.first();

person.last();

person.find({
    name: "Alex"
})