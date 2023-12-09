const express = require("express");
const authMiddeware = require("../middleware/authMiddleware");
const reviewRoute = express.Router();
const db = require("../config/connectToMySQL");

reviewRoute.post("", authMiddeware, async (req, res) => {
  // const id = req.userID;
  const data = req.body;
  // console.log(id, data)
  if (data) {
    try {
      const sqlQuery = `INSERT INTO Reviews ( stars, review, userID, productID) 
      VALUES (?, ?, ?, ?)`;
      const values = [Number(data.stars), data.review, Number(data.userID), Number(data.productID)];
      const result = await db.query(sqlQuery,values);
      res.status(201).json({
        message: "Review added successfully",
        data: result,
      });
    } catch (err) {
      if (err) return res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({
      message: "Authentication failed",
      logOut: true,
    });
  }
});

reviewRoute.delete("", authMiddeware, async (req, res) => {
  const { reviewID } = req.body;
  if (reviewID) {
    try {
      const sqlQuery = `DELETE FROM Reviews WHERE reviewID = ${Number(
        reviewID
      )}`;
      const result = await db.query(sqlQuery);
      res.status(200).json({
        message: "Review deleted successfully",
        data: result,
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

reviewRoute.get("/:userID/:productID", async (req, res) => {
  const userID = req.params.userID;
  const productID = req.params.productID;
  if (userID && productID) {
    try {
      const sqlQuery = `SELECT * FROM Reviews WHERE productID=${Number(
        productID
      )} AND userID=${Number(userID)}`;
      const result = await db.query(sqlQuery);
      res.status(200).json({
        message: "Review fetched successfully",
        data: result,
      });
    } catch (err) {
      if (err) return res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({
      message: "Authentication failed",
      logOut: true,
    });
  }
});

module.exports = reviewRoute;
