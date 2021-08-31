const express = require ("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const uuid = require("../additonal/add")
const {response} = require("express");


const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(express.static("public"));

app.get("/api/nptes", (req,res) => {
    console.info (`${req.method} request recieved for feedback`);

    readFroomFile("./db/db.json").then((data) => res.json(JSON.parse(data)));

});



