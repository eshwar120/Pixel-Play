const express = require('express');
const authMiddeware = require('../middleware/authMiddleware');
const orderRoute = express.Router();
const pool = require('../config/connectToMySQL');

orderRoute.get('', authMiddeware, (req, res) => {
    const userID = req.userId;
    if (userID) {
        console.log(true)
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.status(500).json({ "message": err.message })
            } else {
                const sqlQuery = `SELECT * FROM Orders WHERE userID = ${userID}`;
                connection.query(sqlQuery, (err, result) => {
                    if (err) return res.status(500).json({ "message": err.message });
                    if (result.length === 0) return res.status(200).json({ 
                        "message": "no orders to show" ,
                        data: []
                });
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

orderRoute.get('/:id', authMiddeware, (req, res) => {
    const id = req.params.id;
    if (id) {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.status(500).json({ "message": err.message })
            } else {
                const sqlQuery = `SELECT * FROM Orders WHERE orderID = ${id}`;
                connection.query(sqlQuery, (err, result) => {
                    if (err) return res.status(500).json({ "message": err.message });
                    if (result.length === 0) return res.status(404).json({ "message": "Id not found" });
                    res.status(200).json({
                        "message": "Reviews fetched successfully",
                        data: result
                    })
                })
            }
        })
    }
    else {
        res.status(400).json({ "message": "Please provide id" })
    }
})

orderRoute.post('/neworder',authMiddeware,  (req, res) => {
    const userID = req.userID;
    const data = req.body
    if (userID) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.status(500).json({ "message": err.message })
            } else {

                const dataToInsert = data.map(item => {
                    return {
                        ...item,
                        unlocKey: Math.random().toString(36).toUpperCase().slice(2),
                        orderTime: new Date()
                    }
                });
                const valuesPlaceholder = dataToInsert.map(() => '(?, ?, ?, ?, ?)').join(', ');

                const values = dataToInsert.reduce((acc, obj) => [...acc, Number(obj.userID), Number(obj.productID), obj.unlocKey, obj.price, obj.orderTime], []);

                const sqlQuery = `INSERT INTO Orders (userID,productID,unlocKey,price,orderTime
                    ) VALUES (${valuesPlaceholder}')`

                connection.query(sqlQuery, values, (err, result) => {
                    if (err) {
                        console.log(err.message)
                        return res.status(400).json({ "message": err.message })
                    }
                    res.status(400).json({ "message": "Order placed successfully" })
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

module.exports = orderRoute;