const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb://localhost/Base", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(console.log("connected to mongodb"))
    .catch(err => console.log(err))

app.use(cors())

app.use(express.json());

app.use('/api/users', require('./routes/userroute'));

app.listen(4000, () => {
    console.log('serevr is  connected')
})