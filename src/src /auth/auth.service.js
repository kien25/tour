"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("../config/pg");
const jwt = require("jsonwebtoken");
const mailer_1 = require("../config/mailer");
class authController {
    genVerifyToken(customer) {
        try {
            if (!process.env.JWT_KEY)
                return "";
            const verifiedToken = jwt.sign(customer, process.env.JWT_KEY, {
                expiresIn: 60 * 60,
            });
            return verifiedToken;
        }
        catch (err) {
            throw err;
        }
    }
    // genAccessToken
    genAccessToken(customer) {
        if (!process.env.JWT_KEY)
            return "";
        const accessToken = jwt.sign(customer, process.env.JWT_KEY, {
            expiresIn: 604800,
        });
        return accessToken;
    }
    verifyToken(veryfy_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!process.env.JWT_KEY)
                    return null;
                const customer = jwt.verify(veryfy_token, process.env.JWT_KEY || "");
                return customer;
            }
            catch (err) {
                throw err;
            }
        });
    }
    sendMail(email, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: "me@gmail.com",
                to: email,
                subject: "ACTIVE ACCOUNT",
                text: link,
                html: `<a href="${link}">Click here to active your account</a>`,
            };
            mailer_1.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return false;
                }
                console.log("Message sent: %s", info.messageId);
                return true;
            });
        });
    }
    activeAccout(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
          UPDATE customers
          SET verify_status = true
          WHERE email = $1
          RETURNING id, email
        `, [email]);
                if (customer.rows.length === 0) {
                    return null;
                }
                return customer.rows[0];
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new authController();
