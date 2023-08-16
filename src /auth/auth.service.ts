import { Request, Response } from "express";
import { pool } from "../config/pg";
import jwt = require("jsonwebtoken");
import { transporter } from "../config/mailer";
class authController {
  genVerifyToken(customer: any) {
    try {
      if (!process.env.JWT_KEY) return "";
      const verifiedToken = jwt.sign(customer, process.env.JWT_KEY, {
        expiresIn: 60 * 60,
      });
      return verifiedToken;
    } catch (err) {
      throw err;
    }
  }
  // genAccessToken
  genAccessToken(customer: any) {
    if (!process.env.JWT_KEY) return "";

    const accessToken = jwt.sign(customer, process.env.JWT_KEY, {
      expiresIn: 604800,
    });
    return accessToken;
  }

  async verifyToken(veryfy_token: string) {
    try {
      if (!process.env.JWT_KEY) return null;

      const customer = jwt.verify(veryfy_token, process.env.JWT_KEY || "");

      return customer;
    } catch (err) {
      throw err;
    }
  }

  async sendMail(email: string, link: string) {
    const mailOptions = {
      from: "me@gmail.com",
      to: email,
      subject: "ACTIVE ACCOUNT",
      text: link,
      html: `<a href="${link}">Click here to active your account</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return false;
      }
      console.log("Message sent: %s", info.messageId);
      return true;
    });
  }
  async activeAccout(email: string) {
    try {
      const customer = await pool.query(
        `
          UPDATE customers
          SET verify_status = true
          WHERE email = $1
          RETURNING id, email
        `,
        [email]
      );

      if (customer.rows.length === 0) {
        return null;
      }

      return customer.rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default new authController();
