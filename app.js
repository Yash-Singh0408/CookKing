require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require ('./server/config/database')  //Db Connect file importing
const mongoose = require("mongoose");
const app = express();
const fileUpload = require('express-fileupload');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

//Initialize Port Number
const PORT = process.env.PORT || 5000;


//Connect DB
connectDB();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.use(cookieParser('CookKingSecure'));
app.use(session({
    secret:'CookiKingSecretSession',
    saveUninitialized:true,
    resave:true
}))
app.use(flash());
app.use(fileUpload());



//Layouts
app.set('layout', './layouts/main'); //layout = name || layout/main = were they will be stored
app.set('view engine', 'ejs');

//Routes
const routes = require('./server/routes/recipeRoutes.js');
const { fileLoader } = require("ejs");
app.use('/', routes);



//Listining
app.listen(PORT, () => console.log(`Server is Started On ${PORT}`));
