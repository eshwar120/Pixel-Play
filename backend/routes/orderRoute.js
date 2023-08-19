const express = require("express");
const authMiddeware = require("../middleware/authMiddleware");
const orderRoute = express.Router();
const db = require("../config/connectToMySQL");
const stripeMiddleware = require("./stripeRoute");
const stripeRoute = require("./stripeRoute");

orderRoute.get("", authMiddeware, async (req, res) => {
  const userID = req.userId;
  if (userID) {
    // console.log(true);
    try {
      const sqlQuery = `SELECT Orders.orderID,Orders.productID,Products.productName,Products.image 
        FROM Orders 
        INNER JOIN Products ON Orders.productID = Products.productID AND Orders.userID = ${userID} 
        ORDER BY Orders.orderID DESC`;
      const results = await db.query(sqlQuery);
      if (results.length === 0)
        return res.status(200).json({
          message: "no orders to show",
          data: [],
        });
      res.status(200).json({
        message: "Review deleted successfully",
        data: results,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({
      message: "Authentication failed",
      logOut: true,
    });
  }
});

orderRoute.get("/:id", authMiddeware, async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const sqlQuery = `SELECT * FROM Orders WHERE orderID = ${id}`;
      const result = await db.query(sqlQuery);
      if (result.length === 0) {
        return res.status(404).json({ message: "Id not found" });
      }

      res.status(200).json({
        message: "Reviews fetched successfully",
        data: result,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Please provide id" });
  }
});

// orderRoute.post("/neworder", authMiddeware, stripeRoute);

// orderRoute.post("/neworder", authMiddeware, stripeMiddleware, (req, res) => {
//   const userID = req.userID;
//   const data = req.body;
//   if (userID) {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error("Error getting connection:", err);
//         res.status(500).json({ message: err.message });
//       } else {
//         const dataToInsert = data.map((item) => {
//           return {
//             ...item,
//             unlocKey: Math.random().toString(36).toUpperCase().slice(2),
//             orderTime: new Date(),
//           };
//         });
//         const valuesPlaceholder = dataToInsert
//           .map(() => "(?, ?, ?, ?, ?)")
//           .join(", ");

//         const values = dataToInsert.reduce(
//           (acc, obj) => [
//             ...acc,
//             Number(obj.userID),
//             Number(obj.productID),
//             obj.unlocKey,
//             obj.price,
//             obj.orderTime,
//           ],
//           []
//         );

//         const sqlQuery = `INSERT INTO Orders (userID,productID,unlocKey,price,orderTime
//                     ) VALUES (${valuesPlaceholder}')`;

//         connection.query(sqlQuery, values, (err, result) => {
//           if (err) {
//             console.log(err.message);
//             return res.status(400).json({ message: err.message });
//           }
//           res.status(400).json({ message: "Order placed successfully" });
//         });
//       }
//     });
//   } else {
//     res.status(401).json({
//       message: "Authentication failed",
//       logOut: true,
//     });
//   }
// });

module.exports = orderRoute;
