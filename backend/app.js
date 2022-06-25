const express= require("express");
const app = express();
const errMiddleware=require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileUpload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Routes
const user=require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

app.use(errMiddleware)

module.exports=app;