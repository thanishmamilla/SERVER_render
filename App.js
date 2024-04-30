// express-server/app.js
const express = require('express');
const mongoose = require('mongoose');
const path=require("path");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'build')));

// Other routes and middleware can go here

// Send index.html for any other requests


// MongoDB Connection
mongoose.connect('mongodb+srv://thanishmamilla:thanish123@cluster0.1x0tmmk.mongodb.net/counter_db')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define counter schema and model
const counterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, default: 0 }
},{ collection: 'counters' });
const Counter = mongoose.model('Counter', counterSchema);

// Routes
app.get('/api/counter', async (req, res) => {
    console.log("Reached GET method")
    try {
        let a="counter";
        let b="counter1"
        const counter = await Counter.findOne({name:a});
        const counter1 = await Counter.findOne({name:b});
        console.log(counter);
        let counters={counter:counter,counter1:counter1};
        console.log(counters);
        res.json(counters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/increment', async (req, res) => {
    try {
        let name=req.body.name
        let counter = await Counter.findOne({name});
        console.log("increased",counter);
        if (!counter) {
            counter = new Counter({name});
        }
        counter.count++;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/decrement', async (req, res) => {
    try {
        let name=req.body.name
        let counter = await Counter.findOne({name});
        if (!counter) {
            counter = new Counter({name});
        }
        counter.count--;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
