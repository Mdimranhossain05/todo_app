const express = require("express");
const mongoose = require("mongoose");
const todoRouter = express.Router();
const todoHandler = require("./todoHandler");

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/todos')
.then(()=> console.log("Connection Successfull"))
.catch(err => console.log("error: "+err));

app.use("/todo", todoHandler);

function errorHandler(req, res, err, next){
    if(res.headersSent){ //checking if response has already sent or not
        return next(err);
    }else{
        res.setStatus(500).json({error: err.message});
    }
}

app.listen(3000, (err) => {
    if(!err){
        console.log("Server started at port 3000");
    }else{
        console.log("Server was not started");
    }
})