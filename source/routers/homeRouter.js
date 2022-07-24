const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const nodemailer = require("nodemailer");
const Router  = express.Router();
const currUser=[]

const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
const homeSchema = require('../models/homeSchema');
const jobsSchema = require('../models/jobsSchema');
const { getMaxListeners } = require('process');

Router.get('/',(err,res)=>{
    res.render("home")
    //res.render('register',{title :'Fill Form',password:'',email:''})
})

Router.get("/login",(req,res)=>{
    res.render("loginshagun")
    //res.render('register',{title :'Fill Form',password:'',email:''})
})

Router.get("/register",(req,res)=>{
    res.render('register',{title :'Fill Form',password:'',email:''})
})

// Router.get("/home",(req,res)=>{
//     res.render("index")
// })

Router.post('/register',async(req,res)=>{
   try{
       const {
           name,
           number,
           email,
           password,
           cpassword
       } = req.body;

    if(password === cpassword ){
       
         const userData = new homeSchema({
            name,
            number,
            email,
            password
         })
         userData.save(err=>{
             if(err){
                console.log("err")
             }else{
                res.render('register',{title :'Done',password:'',email:''})
             }
         })
       
    const useremail = await homeSchema.findOne({email:email});
     if(email === useremail.email){
        res.render('register',{title :'',password:'',email:'Email is Already there plz chose different one'})
     }else{
         console.log('err')
     }

    }else{
        res.render('register',{title :'',password:'Password not Matching',email:''})
    }
   }catch(error){

    res.render('register',{title :'Error in Code',password:'',email:''})
   }
})

// singin 
//let currId;

Router.post('/login',(req,res)=>{
    
    const {
        email,
        password    
    } = req.body;
    console.log(email)

    homeSchema.findOne({email:email},(err,result)=>{
        
        if(email === result.email && password === result.password){
          currUser.push(email)
          console.log("came to login post")
          console.log(currUser)
            res.redirect("/home")
            //res.render('dashboard', {name : result.name})
        }else{
            console.log(err)

        }
    })
})

Router.get("/home",function(req,res){
    res.render("index")
  })
  
  
  
Router.get("/govtSchemes",function(req,res){
  
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
  Router.get("/applyJobs",function(req,res){
    res.render("application")
  })
  Router.get("/dashboard",function(req,res){
    res.render("index2")
  })
  Router.post("/applyJobs",function(req,res){
    res.render("application")
  })
  Router.get("/jobDesc",function(req,res){
    res.render("jobDescrip")
  })
  Router.post("/jobDesc",function(req,res){
    res.render("jobDescrip")
  })
  
  Router.get("/singleDescription",function(req,res){
    res.render("application")
    //res.render("singleDescrip")
  })
  Router.get("/seeJobs",function(req,res){
    res.render("jobs")
  })
  Router.get("/seeShops",function(req,res){
    console.log(currUser)
    res.render("postGrid")
    //res.render("application")
  })
  Router.get("/funds",function(req,res){
    res.render("form")
  })

Router.post("/postJob",(req,res)=>{
    try{
      const {
          jobname,
          salary,
          email,
          timing,
          description
      } = req.body;
      
        const jobData = new jobsSchema({
           jobname,
           salary,
           email,
           timing,
           description
        })
        jobData.save(err=>{
            if(err){
               console.log(err)
            }else{
              console.log("saved")
               res.redirect("/jobDesc")
            }
        })
  }catch(error){

   res.render('register',{title :'Error in Code',password:'',email:''})
  }
  })
  
  //app.get("/",function(req,res){
   // res.render("login")
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
  //})
  
  
 // app.post("/login",function(req,res){
  //  res.render("login")
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
  //})
  
  Router.post("/enterHomeAfterLogin",function(req,res){
    res.redirect("/home")
  })
  
  Router.get("/",function(req,res){
    res.render("homePage")
  })
  
//   app.get("/register",function(req,res){
//     res.render("register")
//   })
//   app.post("/register",function(req,res){
//     res.render("register")
//   })
  
//   app.post("/dataEntry",function(req,res){
  
//   })
Router.post("/sendmail",(req,res)=>{
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'sharma.khushi.221102@gmail.com',
      pass: '',
      clientId: '',
      clientSecret: '',
      refreshToken: ''
    }
  });

  let mailOptions = {
    from: 'sharma.khushi.221102@gmail.com',
    to: req.body.email,
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project'
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });







})
  





module.exports = Router;
