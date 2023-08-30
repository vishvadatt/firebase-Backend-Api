const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./Routes/user.routes');
// const config = require('./config');

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

app.use('/api',router);

app.listen(5000,() => {
    console.log("running on 5000");
})