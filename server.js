const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://jsurya96:SmartWork@cluster0.a8gma.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('start-wars-quotes')
        const quotesCollection = db.collection('quotes');
        // Handlers....
        app.listen(3001, () => {
            console.log('running in 3001')
        })

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray().then(result => {
                res.render('index.ejs', { quotes: result })
            }).catch(error => console.log(error));
        })

        app.post('/quotes', (req, res) => {
            console.log(req.body);
            quotesCollection.insertOne(req.body).then(result => {
                console.log(result)
                res.redirect('/');
            }).catch(error => console.log(error));
        })
    })
    .catch(error => console.error(error))

