const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
const express = require("express");
const app=express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/azureDB",{useNewUrlParser: true});
// const azureLoginSchema = {
//   passw: String,
//   email:String

//   };

// const azureLoginData = mongoose.model("azureLoginData", azureLoginSchema);

app.get("/home",function(req,res){
  res.render("index")
})



app.get("/govtSchemes",function(req,res){

// Write Headers
writeStream.write(`Title,Link,Date \n`);

request('https://www.godigit.com/guides/government-schemes/women-empowerment-schemes-in-india', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    var arr = new Array()

    $('.content-info-list').each((i,el)=>{
        const titles = $(el).text();
        arr.push(titles);
        console.log(titles)
    })

    res.render("pageFinal",{
      arr:arr
    })

    console.log('Scraping Done...');
  }});

});
app.get("/applyJobs",function(req,res){
  res.render("application")
})
app.get("/dashboard",function(req,res){
  res.render("index2")
})
app.post("/applyJobs",function(req,res){
  res.render("application")
})
app.get("/jobDesc",function(req,res){
  res.render("jobDescrip")
})
app.post("/jobDesc",function(req,res){
  res.render("jobDescrip")
})

app.get("/singleDescription",function(req,res){
  res.render("singleDescrip")
})
app.get("/seeJobs",function(req,res){
  res.render("jobs")
})
app.get("/seeShops",function(req,res){
  res.render("postGrid")
})
app.get("/funds",function(req,res){
  res.render("form")
})

app.get("/",function(req,res){
  res.render("login")
  // var em=req.body.em;
  // var pass = req.body.pass;
  // if(em=="s"){
  //   if(pass=="a"){
  //     res.render("index")
  //   }
  //   else{
  //     res.render("error")
  //   }
  // }
  // else{
  //   res.render("error")
  // }
})
app.post("/",function(req,res){
  res.redirect("/home")
  // var emaa=req.body.em;
  // var passaa = req.body.pass;
  // console.log(emaa)

  // if(em=="s"){
  //   if(pass=="a"){
  //     res.redirect("/home")
  //   }
  //   else{
  //     res.render("error")
  //   }
  // }
  // else{
  //   res.render("error")
  // }
})



app.listen(3000,function(req,res){
    console.log(" server ported from 3000...");
})
