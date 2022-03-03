const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstname = req.body.firstname;
  const secondname = req.body.secondname;
  const email = req.body.email;
  console.log(firstname);
  console.log(secondname);
  console.log(email);
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: secondname
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/9f2984715e";
  const options={
    method: "POST",
    auth: "jagadeesh:3d0f6ef7e7fff4b4e3b32644beef8f7e-us14"
  }
  const request=https.request(url,options,function(response){

    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});



app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("the server is running on port 3000")
});
//api=3d0f6ef7e7fff4b4e3b32644beef8f7e-us14
//list id=9f2984715e
