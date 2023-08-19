const express = require("express");
const authMiddeware = require("../middleware/authMiddleware");
const reviewRoute = express.Router();
const db = require("../config/connectToMySQL");

reviewRoute.post("", authMiddeware, async (req, res) => {
  const id = req.userID;
  const data = req.body;
  if (id && data) {
    try {
      const sqlQuery = `INSERT INTO Reviews ( stars, review, userID, productID) 
        VALUES (${Number(data.stars)},'${data.review}',${Number(id)},${Number(
        data.productID
      )})`;
      const result = await db.query(sqlQuery);
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

module.exports = reviewRoute;
