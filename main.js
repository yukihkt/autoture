const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:MEOBreeze123@serverlessinstance0.rwwmi.mongodb.net/autoture?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const gcpUri = "mongodb://34.152.37.64:27017/autoture?directConnection=true"


const app = express();

const user = require('./routes/user');
const vehicle = require('./routes/vehicle');
const authMiddleware = require('./auth-middleware');

const port = process.env.PORT || 8080;

// Setup 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Register routes
app.get('/health', (req, res) => {
    res.json({
        message: 'Running'
    })
})
app.use('/auth', user)

app.use('/api', authMiddleware, vehicle)

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



const start = async () => {

    try {
        // MongoClient.connect(gcpUri, { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true}).then(() => {
        //     console.log("success");
        // }).catch(e => {
        //     console.error(e);
        //     console.log(e)
        //     process.exit();
        // })

        //await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => console.log("Mongoose is connected"))
        await mongoose.connect('mongodb://localhost:27017/autoture');
        //await mongoose.connect('mongodb://mongo:27017/autoture');
        //await mongoose.connect('mongodb://34.152.37.64:27017/autoture', { useNewUrlParser: true, useUnifiedTopology: true});
        // Server run
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running over here http://localhost:${port}/health`)
        })
    } catch (error) {
        console.error('Failed to get the server running', error)
    }
}

start();