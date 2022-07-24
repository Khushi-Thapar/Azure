const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const bodyParser = require('body-parser');
const writeStream = fs.createWriteStream('post.csv');
const express = require("express");
const app=express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require("mongoose");
const homeRouter = require('./routers/homeRouter')
const port  = process.env.port || 8080;

//const app  = express();

// db con

mongoose.connect('mongodb://localhost:27017/studentsdata',{useNewUrlParser:true})
const db = mongoose.connection;

db.on("error",()=>{console.log("error in conection");})
db.once('open',()=>{console.log("Connected");})

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', homeRouter)


app.listen(3000,function(req,res){
    console.log(" server ported from 3000...");
})
