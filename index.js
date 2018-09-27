

const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const pc = require('./server/controllers/products_controller')

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log("Connected to the db")
})
.catch(err => {console.log(err)})

app.get('/api/products', pc.getAll )
app.get('/api/products/:id', pc.getOne)
app.post('/api/products', pc.create)
app.put('/api/products/:id', pc.update)
app.delete('/api/products/:id', pc.delete)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
