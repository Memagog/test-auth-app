const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const {mongoUrl, secretKey} = require("./config/config");
const router = require('./routes/router.js');
const passport = require('./controller/auth');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({
    extended: true
}))  
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session())

app.use('/api', router);
app.get("/", (req,res)=> res.send("hello User"))

const server =  async () => {
    try {
        await mongoose.connect(mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log(`Database is connected`))
        await app.listen(port, () => console.log(`listening on http://localhost:${port}`));
    } catch (error) {
        console.log(error)
    }      
}

server();
