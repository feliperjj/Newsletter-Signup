//jshint esversion: 6
const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");
  });

  app.post("/",function(req,res){

    const firstName = req.body.fName;
    const lastName= req.body.lName;
    const email = req.body.email;
   const data = {
        members:[{
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME: firstName,
            LNAME: lastName
        }

        }]

   };
        const jsonData = JSON.stringify(data);
       const url = "https://us12.api.mailchimp.com/3.0/lists/5886299629";
       const options = {
            method:"POST",
            auth:"feliperjj:3a652e48d7ebe0460e06af63695eaf56-us12"

       } 
      const request = https.request(url,options,function(response){
        response.on("data",function(data){
           if (response.statusCode === 200){

            res.sendFile(__dirname+"/success.html");

           }else{
            res.sendFile(__dirname+"/failure.html");
             }
                console.log(JSON.parse(data));
        })
        })

            request.write(jsonData);
            request.end();
    })
 

  app.listen(process.env.PORT || 3000,function(){


    console.log("Server Running");
    
    })

    //3a652e48d7ebe0460e06af63695eaf56-us12

    // 5886299629