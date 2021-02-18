const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const distDir = "../dist/";
const bodyParser = require ('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Fr33zy:1234@cluster0.5xdel.mongodb.net/base1?retryWrites=true&w=majority";

const app = express();
var promise = mongoose.connect(uri, {useNewUrlParser: true});

promise.then(() => {
    console.log('DB Connected');
    app.listen('5001', () => {
        console.log ('Listenning on port 5001');
    })
})


// Configuration
app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + "/index.html"));
});

app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());