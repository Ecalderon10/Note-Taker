const express = require ("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const uuid = require("./helper/helper")
const {response} = require("express");


const PORT = process.env.PORT || 3002;

const app = express();


app.use(express.urlencoded({extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/api/notes", (req,res) => {
    console.info (`${req.method} request recieved for feedback`);

    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));

});

app.get("/notes", (req,res)=> {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination,content)=> 
fs.writeFile( destination, JSON.stringify(content, null, 4), (err) =>
err ? console.error (err) : console.info (`\nData written to ${destination}`));

const readAndAppend = (content, file) => 
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
        console.error(err);
        } else {
            const parsedData = JSON.parse (data);
            parsedData.push(content);
            writeToFile(file,parsedData);
        }
    });


    app.post ("/api/notes", (req,res) => {
        console.info (`${req.method} request recieved to submut note`);

        const {title, text} = req.body;
    

    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, "./db/db.json");
        
        const response = {
            status: "success",
            body: newNote,
        };
        
        res.json(response);

    } else {
    res.json("Error");
    }
});


app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});



