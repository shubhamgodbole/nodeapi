const express= require("express");
const bodyparser=require("body-parser");
const app=express();
const router=require('./rout/rout');
const cors = require('cors');

// file upload
var exupload=require("express-fileupload");
var path=require("path");
var mv = require('mv');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb'}));
app.use("../../img", express.static(  '../../img'));
app.use(exupload());
app.use(cors());
router.route(app);
app.listen(1234,()=>{
    console.log("server is start");
});
