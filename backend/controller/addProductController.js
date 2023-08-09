const multer = require('multer');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const firebaseConfig = require("../config/connectToFirebase");
const express = require("express");
const pool = require('../config/connectToMySQL');
const addProductController = express.Router();


// Initialize Firebase
initializeApp(firebaseConfig);

//Intialize cloud storage and get a reference of the service
const storage = getStorage();

//setting up multer as a middle ware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

addProductController.use('', upload.single("image"), async (req, res) => {
    console.log(true, "add")
    try {
        const data = req.body;
        if (!data || !data.productName || !data.price || !data.description)
            console.log(req.body);
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname + "    " + dateTime}`);
        //create file metadata including the content type
        const metaData = {
            contentType: req.file.mimetype
        };

        //upload the file in the bucket storage
        const snapShot = await uploadBytesResumable(storageRef, req.file.buffer, metaData);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        //grap public url
        const downloadURL = await getDownloadURL(snapShot.ref);
        console.log(downloadURL)

        // Replace single quotes with double quotes
        const sanitizedProductName = data.productName.replace(/'/g, "''");
        const sanitizedPrice = data.price.replace(/'/g, "''");
        const sanitizedDescription = data.description.replace(/'/g, "''");

        // data.description = data.description.replace(/'/g, "''")
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.status(500).json({ "message": err.message })
            } else {
                const sqlQuery = `INSERT INTO Products (productName,price,description,image) VALUES ('${sanitizedProductName}', '${sanitizedPrice}', '${sanitizedDescription}', '${downloadURL}')`
                connection.query(sqlQuery, (err, result) => {
                    if (err) {
                        console.log(err.message)
                        return res.status(500).json({ "message": err.message })
                    }
                    console.log(result)
                    res.status(201).json({
                        "message": "Products added successfully",
                        productData: result
                    });

                })
            }
        })
    }
    catch (e) {
        console.log(e)
        return res.status(400).json({
            "message": e.message
        })
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}


module.exports = addProductController;