const express = require('express');
const authMiddeware = require('../middleware/authMiddleware');
const reviewRoute = express.Router();
const pool = require('../config/connectToMySQL');


reviewRoute.post('', authMiddeware, (req, res) => {

    const id = req.userID;
    const data = req.body;
    if (id && data) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.status(500).json({ "message": err.message })
            } else {
                const sqlQuery = `INSERT INTO Reviews ( stars, review, userID, productID) VALUES (${Number(data.stars)},'${data.review}',${Number(id)},${Number(data.productID)})`;
                connection.query(sqlQuery, (err, result) => {
                    if (err) return res.status(500).json({ "message": err.message });
                    res.status(201).json({
                        "message": "Review added successfully",
                        data: result
                    })
                })
            }
        })
    }
    else {
        res.status(401).json({
            "message": "Authentication failed",
            "logOut": true
        })
    }
})

reviewRoute.delete('', authMiddeware, (req, res) => {

    const { reviewID } = req.body;
    if (reviewID) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.status(500).json({ "message": err.message })
            } else {
                const sqlQuery = `DELETE FROM Reviews WHERE reviewID = ${Number(reviewID)}`;
                connection.query(sqlQuery, (err, result) => {
                    if (err) return res.status(500).json({ "message": err.message });
                    res.status(200).json({
                        "message": "Review deleted successfully",
                        data: result
                    })
                })
            }
        })
    }
    else {
        res.status(401).json({
            "message": "Authentication failed",
            "logOut": true
        })
    }
})

module.exports = reviewRoute;