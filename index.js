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


app.get('/flights/:flights', (req, res) => {
    const depDate = req.params.flights.slice(0, 10);
    const dep = req.params.flights.slice(10, 13);
    const arri = req.params.flights.slice(13, 16);
    console.log(dep, depDate, arri);

    getJson({
        api_key: "5ef558635e604638687cf7626054f73f4b7b5639cddb37b45f2984e8c79b1ecb",
        engine: "google_flights",
        departure_id: dep,
        arrival_id: arri,
        hl: "en",
        currency: "USD",
        outbound_date: depDate,
        type: "2"
    }, (results) => {
        //console.log(util.inspect(results, { depth: null, colors: true }));
        res.json(results);
    });
});


app.get('/hotels', (req, res) => {
    getJson({
        api_key: "5ef558635e604638687cf7626054f73f4b7b5639cddb37b45f2984e8c79b1ecb",
        engine: "google_hotels",
        q: "Bali",
        check_in_date: "2024-03-05",
        check_out_date: "2024-03-06",
        adults: "2",
        currency: "USD",
        gl: "us",
        hl: "en",
    }, (results) => {
        //console.log(util.inspect(results, { depth: null, colors: true }));
        res.json(results);
    });
});


app.get('/', (req, res) => {
    res.send('flight server is running')
})

app.listen(port, () => {
    console.log(`flight & hotel Server is running on port: ${port}`)
});
