const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const db = require("./config/db");
const userRouter = require("./routes/user.router");
const ownerRouter = require("./routes/owner.router");
const productRouter = require("./routes/product.router");
const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(
    expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    })
)
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs');

app.use("/", indexRouter);
app.use ("/users", userRouter);
app.use("/owners", ownerRouter);
app.use ("/products", productRouter);


app.listen(3000);
