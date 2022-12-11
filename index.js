const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT | 5000;
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
    try{
        const projectCollection = client.db('portfolio').collection('projects')
        app.get('/projects', async(req, res) => {
            const query = {};
            const result = await projectCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/projects/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)}
            const result = await projectCollection.findOne(filter);
            res.send(result);
        })
    }
    finally{}
}
run().catch(error => console.error(error))

app.listen(port, () => {
    console.log(`Server is running oon port: ${port}`);
})