require('dotenv').config()

const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route imports
const filmRoutes = require('./routes/films')

// routes
app.use('/films',filmRoutes)

// db connection
mongoose.connect(process.env.MONGODB_CONN)
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('Listening on port', process.env.PORT || 4000);
        });
    })
    .catch((error) => {
        console.log(error)
    })

