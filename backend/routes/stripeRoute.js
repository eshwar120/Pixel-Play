const express = require("express");
const authMiddeware = require("../middleware/authMiddleware");
const stripeRoute = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../config/connectToMySQL");

stripeRoute.post("", authMiddeware, async (req, res) => {
  const YOUR_DOMAIN = process.env.CLIENT_URL;
  console.log(req.body);

  const customer = await stripe.customers.create({
    metadata: {
      userID: req.userId,
      cartData: JSON.stringify(
        req.body.map((item) => {
          return {
            productID: item.productID,
            price: item.price,
          };
        })
      ),
    },
  });

  const cartData = req.body;
  const line_items = cartData.map((item) => {
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: item.productName,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/checkout-success`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  });

  res.send({ url: session.url });
});

const endpointSecret = process.env.STRAPI_CLI_ENDPOINT_SECRET;

stripeRoute.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: `${endpointSecret}`,
    });

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        `${endpointSecret}`
      );
      console.log("Webhook verified");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log(request.body);
    const data = req.body.data.object;
    const eventType = req.body.type;
    console.log(eventType);
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {

          const userID = customer.metadata.userID;
          const orderData = JSON.parse(customer.metadata.cartData);
          if (userID) {
            const dataToInsert = orderData.map((item) => {
              return {
                unlockKey: Math.random().toString(36).toUpperCase().slice(2),
                ...item,
              };
            });
            const d = new Date();
            const utc = d.getTime() + d.getTimezoneOffset() * 60000;
            const nd = new Date(utc + 3600000 * +5.5);
            const ist = nd.toLocaleString("en-IN").split(",").join(" ");
            // console.log("IST now is : " + ist);

            const values = dataToInsert.map((obj) => {
              return [
                obj.unlockKey,
                obj.price,
                Number(obj.productID),
                Number(userID),
                ist,
              ];
            });
            const sqlQuery = `INSERT INTO Orders (unlockKey,price,productID,userID,orderTime) 
                VALUES ?`;
            const result = await db.query(sqlQuery, [values]);
            res.status(200).send().end();
          }
        })
        .catch((err) => console.log(err.message));
    }
  }
);

module.exports = stripeRoute;
