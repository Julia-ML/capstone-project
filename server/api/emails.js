const express = require("express");
const app = express.Router();
const nodemailer = require("nodemailer");
module.exports = app;

app.post("/test", async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Zoho",
      auth: {
        user: "devtest2207@zohomail.com",
        pass: process.env.EMAILPASS,
      },
    });
    const mailOptions = {
      from: "devtest2207@zohomail.com",
      to: "ramir101@gmail.com",
      subject: "Sending Email using Node.js",
      text: "second test",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: 2 " + info.response);
      }
    });

    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});
