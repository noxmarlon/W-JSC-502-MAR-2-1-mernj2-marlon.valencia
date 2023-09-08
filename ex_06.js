const express = require('express');
const parser = require('body-parser');
const {MongoClient} = require('mongodb');
const app = express()

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');

// Connect to the db
MongoClient.connect("mongodb://localhost:27042", {useNewUrlParser: true, useUnifiedTopology: true},function (err, client ) {
    if(err) {
        console.log("Connection failed.")
        return
    }
    console.log("Connection successfull.")

    const db = client.db('mern-pool')

    app.post('/register', async function (req, res) {
        const collection = db.collection('students')

        const last_user = await collection.findOne({},{sort:{$natural:-1}});
        const id = last_user === null ? 1 : last_user.id+1

        var student = {
            id: parseInt(id),
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            email : req.body.email,
            validated : req.body.validated,
            admin : req.body.admin === 'oui',
        }

        collection.insertOne(student, function(err, insert) {
            if (err) {
                res.render('vista5/index', {message : 'Failed to save the collection.'})
                return
            }
            const message = "Collection saved."
            res.render('vista5/index', {message : message})
        });
    })

    app.get('/', function (req, res){
        const collection = db.collection('students')

        var query = { validated: 'in progress' };
        var mysort = { lastname: 1 };

        collection.find(query).sort(mysort).toArray(function(err, result) {
            if (err) {
                console.log(err) ;
                res.render('vista6/studiants', {students: [], message : 'no student'})

                return
            }
            res.render('vista6/studiants', {students : result, message : ''})
        });
    })

    app.listen(4242, function () {
        console.log('http://localhost:4242 !')
    })
});