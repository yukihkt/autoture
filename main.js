const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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


const start = async () => {

    try {
       
        //await mongoose.connect('mongodb://localhost:27017/autoture');
        //await mongoose.connect('mongodb://mongo:27017/autoture');
        // Server run
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running over here http://localhost:${port}/health`)
        })
    } catch (error) {
        console.error('Failed to get the server running', error)
    }
}

start();