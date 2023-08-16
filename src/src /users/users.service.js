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
class UserService {
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
        select*from customers 
        where email = $1
        limit 1
        `, [email]);
                if (customer.rows.length === 0) {
                    return true; // not ton tai
                }
                return false;
            }
            catch (err) {
                throw err;
            }
        });
    }
    insert(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
          INSERT INTO customers (name, phone, email, password, veryfy_token, verify_status)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email
        `, [
                    payload.name,
                    payload.phone,
                    payload.email,
                    payload.password,
                    payload.veryfy_token,
                    payload.verify_status,
                ]);
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
    findOneByVerfiedToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
          SELECT *
          FROM customers
          WHERE email = $1
            AND veryfy_token = $2
            AND verify_status = $3
          LIMIT 1
        `, [payload.email, payload.veryfy_token, false]);
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
    findOneByPassword(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield pg_1.pool.query(`
        SELECT *
        FROM customers
        WHERE email = $1
        LIMIT 1
      `, [payload.email]);
                if (customer.rows.length === 0) {
                    return null;
                }
                const data = customer.rows[0];
                if (data.password !== payload.password) {
                    return null;
                }
                return data;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new UserService();
