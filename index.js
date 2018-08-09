const express = require('express');
const bodyParser = require('body-parser');
const Person = require('./models/Person');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/people', (req, res) => {
    const people = new Person();
    people.findAll().then(people => {
        res.send({
            status: 200,
            message: 'OK',
            people
        });
    }).catch(err => {
        if(err){
            throw err;
        }
    })
    people.connection.close();
})

app.get('/person/:name', (req, res) => {
    const person = new Person();
    const req_person = req.params.name;
    person.find({
        name: req_person
    }).then(person => {
        res.send({
            status: 200,
            message: "OK",
            person
        })
    });
    people.connection.close();
})

app.post('/person', (req, res) => {
    const person = new Person();
    const name = req.body.name;

    person.create({
        name: name
    }).then(response => {
        res.send({
            status: 200,
            message: "OK",
            response
        })
    }).catch(err => {
        throw err;
    });
    people.connection.close();
})

app.listen(3000, () => {
    console.log("Spells app listening on port 3000");
})