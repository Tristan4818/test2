var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
const { getBSD, init, highGPA } = require("./test2_module.js");

require("./test2_module.js");

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", function(req, res){
    let resText = "<h2> Declaration: </h2>"
    resText += " <p> I declare that this test is my own work in accordance with Seneca Academic Policy. No part of this test has been copied manually or electronically from any other source </p>"
    resText += "<p> Name: <mark><b>Tristan Mendez-Smith </b></mark></p> "
    resText += "<p> Student Number: <mark><b>143368215 </b></mark></p> "
    resText += "<a href = '/BSD'> Click to visit BSD Students </a> <br>";
    resText += "<a href = '/highGPA'> Click to see who has the highest GPA </a>";
    res.send(resText);
});

app.get("/BSD", function(req, res){
    getBSD()
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(err)
    });
});

app.get("/highGPA", function(req, res){
    highGPA()
    .then((highest) => {
        let resText = "<h2> Highest GPA: </h2>";
        resText += " <p> Student ID: </p>" + highest.studId;
        resText += " <p> Name: </p>" + highest.name;
        resText += " <p> Program: </p>" + highest.program;
        resText += " <p> GPA: </p>" + highest.gpa;
        res.send(resText);
    })
    .catch(function(msg){
        console.log(msg);
    });
});


app.use((req, res) => {
    let resText = "<h3>Error 404</h3>";
    resText += "<p><b>Page Not Found!</b> <a href = '/'> Go Back Home </a></p>"
    res.status(404).send(resText);
  });

init()
.then(app.listen(HTTP_PORT, onHttpStart))
.catch(function(msg){
    console.log(msg);
});