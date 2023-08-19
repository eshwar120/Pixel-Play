const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/connectToMySQL");

userRoute.post("/signin", async (req, res) => {
  const data = req.body;
  if (data) {
    console.log(data);
    if (!data.email || !data.password) {
      return res
        .status(401)
        .json({ message: "Please provide valid credentials" });
    }
    try {
      const sqlQuery = `SELECT * FROM Users WHERE email = '${data.email}'`;
      const result = await db.query(sqlQuery);
      const [dataFromDB] = result;
      if (!dataFromDB) {
        return res
          .status(401)
          .json({ message: "Please provide valid credentials" });
      }
      const match = bcrypt.compareSync(data.password, dataFromDB.password);
      if (!match) {
        return res
          .status(401)
          .json({ message: "Please provide valid credentials" });
      }
      const accessToken = jwt.sign(
        {
          userID: dataFromDB.userID,
          email: dataFromDB.email,
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "60m" }
      );
      res.status(200).json({
        message: "Signed in successfully",
        email: dataFromDB.email,
        userID: dataFromDB.userID,
        name: dataFromDB.name,
        token: accessToken,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Please provide valid credentials" });
  }
});

userRoute.post("/signup", async (req, res) => {
  const data = req.body;
  if (data) {
    console.log(data);
    if (!data.email || !data.password || !data.confirmPassword || !data.name) {
      return res
        .status(400)
        .json({ message: "Please provide valid credentials" });
    } else if (data.password !== data.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password should be matching" });
    }
        try{
            const sqlQuery1 = `SELECT * FROM Users WHERE email = '${data.email}'`;
            const result = await db.query(sqlQuery1);
            const [dataFromDB] = result;
            console.log(dataFromDB);
            if (dataFromDB) {
                return res.status(409).json({ message: "Email already in use" });
            }
            const hashedPassword = bcrypt.hashSync(
                data.password,
                Number(process.env.SALTING)
            );
            const role = "user";
            const sqlQuery2 = `INSERT INTO Users (name,email,password,role) VALUES ('${data.name}','${data.email}','${hashedPassword}','${role}')`;
            const result2 = await db.query(sqlQuery2)
            res.status(200).json({ message: "Signed up successfully" });
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
  } else {
    res.status(400).json({ message: "Please provide valid credentials" });
  }
});

module.exports = userRoute;
