const express = require('express');
const bodyParser = require('body-parser');
const mySql = require('mysql2');
const app = express();
const connectDB = require('./config/connectToMySQL');
const cors = require("cors");
const bodyParserErrorHandler = require('express-body-parser-error-handler');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const reviewRoute = require('./routes/reviewRoute');
const orderRoute = require('./routes/orderRoute');
require('dotenv').config();
PORT = process.env.PORT || 8080

//connecting to Mysql DB


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
//using express-body-parser-error-handler to handle the error incase of invalid json received
app.use(bodyParserErrorHandler());


//routes
app.use("/api/users",userRoute);
app.use('/api/products', productRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/orders', orderRoute);

app.use("/*", (req,res) => {
    res.status(404).json({"message" : "route not found"})
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
