const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_PATH;

app.get("/", (req, res) => {
    res.send("Thank you for calling me");
});

//post
app.post("/addDoctorsChamber", (req, res) => {
    const doctorsCard = req.body;
    console.log(doctorsCard);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("portal").collection("schedules");
        // perform actions on the collection object
        collection.insert(doctorsCard, (err, result) => {
            err ? console.log(err) : res.send(result.ops[0]);
        });
        console.log("data added");
        client.close();
    });
});

//post patients info
app.post("/patientsInfo", (req, res) => {
    const info = req.body;
    console.log(info);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("portal").collection("AppointedPatients");
        // perform actions on the collection object
        collection.insertOne(info, (err, result) => {
            err ? console.log(err) : res.send(result.ops[0]);
        });
        console.log("Patinets data added");
        client.close();
    });
});

app.get("/schedules", (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("portal").collection("schedules");
        // perform actions on the collection object
        collection.find().toArray((err, result) => {
            err ? console.log(err) : res.send(result);
        });
        client.close();
    });
});

app.get("/getPatientsInfo", (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
        const collection = client.db("portal").collection("AppointedPatients");
        // perform actions on the collection object
        collection.find().toArray((err, result) => {
            err ? console.log(err) : res.send(result);
        });
        client.close();
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Listening to port 4000"));
