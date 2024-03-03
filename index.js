const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { getJson } = require("serpapi");
const util = require('util');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/flights', (req, res) => {
    getJson({
        api_key: "214cb42dbfa1aa754da30cf2ec78aa5c679f43624bc4bfb4eb1ee6d336311e15",
        engine: "google_flights",
        departure_id: "LHR",
        arrival_id: "NRT",
        hl: "en",
        currency: "USD",
        outbound_date: "2024-04-04",
        type: "2"
    }, (results) => {
        console.log(util.inspect(results, { depth: null, colors: true }));
        res.json(results);
    });
});

app.get('/', (req, res) => {
    res.send('flight server is running')
})

app.listen(port, () => {
    console.log(`flight Server is running on port: ${port}`)
});
