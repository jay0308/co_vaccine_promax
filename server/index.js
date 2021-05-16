const express = require('express');
const app = express()
require('dotenv').config();
const port = process.env.NODE_ENV === "development" ? 5004 : process.env.PORT || 8080;
const bodyParser = require('body-parser');
const path = require('path');

const http = require('http')
let server = http.createServer(app);


// initialize db
require("./loaders/dbInitializer").initialize();

// initialize sms service
require("./loaders/initializeSMS");

//initialize redis
// require("./loaders/redisInitializer");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//set static folder
app.use(express.static(path.join(__dirname, '../build')));

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:5000'}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.NODE_ENV === "development" ? "http://localhost:5000" : "*"}`); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth,X-Auth-Token");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE, PUT")
    next()
})


const apis = require("./controllers/routes");
app.use('/api', apis);

app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../build') + '/index.html');
});


// app.get('/api', (req, res) => res.send('Hello World!'));


// app.get('/', function (req, res, next) {
//     res.sendFile(path.join(__dirname, '/public') + '/index.html');
// });



server.listen(port, () => console.log(`Example app listening on port ${port}!`))