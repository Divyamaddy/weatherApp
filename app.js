const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html")

    /// res.send("Server is up and running");
})

app.post("/",function(req,res){
   
const query = req.body.cityName;
const apiKey = "56efc74ff8d797c38365819cef8337ad" ;
const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey  + "&units=" + unit;
https.get(url,function(response){
    console.log(response.statusMessage);

    response.on("data",function(data){
       // console.log(data);
       const weatherData = JSON.parse(data);

       const temp = weatherData.main.temp;

       const weatherDescription = weatherData.weather[0].description;

       const icon = weatherData.weather[0].icon;
                            
 
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h2>The temperature in " + query +  " is " + temp + " degrees celcius</h2>");

         //we can use res.send() only one time in js code
    
      // console.log(weatherData);

      var imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
    
})
  
})
app.listen(3000,() => {
    console.log("hi program is executing successfully");
})



