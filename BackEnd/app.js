const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require("./config/mongoose-connection");
const userRouter = require("./routes/user.router");
const ownerRouter = require("./routes/owner.router");
const productRouter = require("./routes/product.router");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs');

app.use ("/users", userRouter);
app.use("/owners", ownerRouter);
app.use ("/products", productRouter);


app.listen(3000);
