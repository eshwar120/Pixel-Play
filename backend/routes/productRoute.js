const express = require('express');
const authMiddeware = require('../middleware/authMiddleware');
const addProductController = require('../controller/addProductController');
const productRoute = express.Router();
// const connectDB = require('../config/connectTomySql').databaseConnection;
const pool = require('../config/connectToMySQL')
const mySql = require('mysql2');

productRoute.get('', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            res.status(500).json({ "message": err.message })
        } else {
            const sqlQuery = `SELECT productName,productID,price,image From Products`
            connection.query(sqlQuery, (err, result) => {
                if (err) {
                    console.log(err.message)
                    return res.status(500).json({ "message": err.message })
                }
                // console.log(result)
                res.status(200).json({
                    "message": "Products fetched successfully",
                    productsData: result
                });

            })
        }
        connection.release();
    })
})

productRoute.get('/search/:name', (req, res) => {
    try {
        const name = req.params.name;
        // console.log(true)
        if (name) {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('Error getting connection:', err);
                    res.status(500).json({ "message": err.message })
                } else {
                    const sqlQuery = `
                        SELECT productName,productID,price,image 
                        From Products 
                        WHERE productName Like '%${name}%'`

                    connection.query(sqlQuery, (err, result) => {
                        if (err) {
                            console.log(err.message)
                            return res.status(500).json({ "message": err.message })
                        }
                        if (result.length === 0) return res.status(404).json({ "message": "name not found" });

                        res.status(200).json({
                            "message": "Product fetched successfully",
                            productsData: result
                        });

                    })

                }
                // connection.release();
            })
        }
        else {
            res.status(400).json({ "message": "Please provide name" })
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message })
    }
})

productRoute.get('/:id', (req, res) => {

    // console.log(req.params)
    try {
        const id = Number(req.params.id);
        if (id) {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('Error getting connection:', err);
                    res.status(500).json({ "message": err.message })
                } else {
                    const sqlQuery = `
                        SELECT *
                        FROM Reviews
                        LEFT JOIN Products ON Reviews.productID = Products.productID
                        UNION
                        SELECT *
                        FROM Reviews
                        RIGHT JOIN Products ON Reviews.productID = Products.productID
                        WHERE Products.productID = '${id}'`

                    connection.query(sqlQuery, (err, result) => {
                        if (err) {
                            console.log(err.message)
                            return res.status(500).json({ "message": err.message })
                        }
                        if (result.length === 0) return res.status(404).json({ "message": "Id not found" });

                        res.status(200).json({
                            "message": "Product fetched successfully",
                            productData: result
                        });

                    })
                }
                connection.release();
            })
        }
        else {
            res.status(400).json({ "message": "Please provide id" })
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message })
    }

})

productRoute.patch('/:id', authMiddeware, (req, res) => {

    const id = req.params.id;
    const data = req.body;
    if (id && data) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.status(500).json({ "message": err.message })
            } else {
                const sqlQuery = `SELECT * From Products WHERE productID = ${Number(id)}`
                connection.query(sqlQuery, (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).json({ "message": err.message });
                    }
                    if (result.length === 0) return res.status(404).json({ "message": "Id not found" });
                    const [dataFromDB] = result;
                    let sqlQuery = `UPDATE Products SET `

                    for (const key in data) {

                        if (dataFromDB.hasOwnProperty(key) && key !== "image") {
                            sqlQuery += `${key} = ${mySql.escape(data[key])}, `;
                        }
                    }
                    sqlQuery = sqlQuery.slice(0, -2) + `WHERE productID = ${id}`
                    console.log(sqlQuery)

                    connection.query(sqlQuery, (err, result) => {
                        if (err) {
                            console.log(err.message)
                            return res.status(500).json({ "message": err.message })
                        }
                        console.log(result)
                        res.status(200).json({
                            "message": "Products updated successfully",
                            productData: result
                        });

                    })


                })
            }
            connection.release();
        })

    }
    else {
        res.status(400).json({ "message": "Please provide valid details" });
    }

})

productRoute.delete('/:id', authMiddeware, (req, res) => {

    const id = req.params.id;
    if (!id) {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.status(500).json({ "message": err.message })
            } else {
                connection.query(`DELETE FROM Products WHERE productID = ${id}`, (err, result) => {
                    if (err) {
                        console.log(err.message)
                        return res.status(500).json({ "message": err.message })
                    }
                    res.status(200).json({ "message": "Products deleted successfully" });
                })
            }
            connection.release();
        })
    }
    else {
        res.status(400).json({ "message": "Please provide valid details" })
    }
})

productRoute.post('/addProduct', authMiddeware, addProductController);



module.exports = productRoute;