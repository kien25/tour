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
        where email =$1 
        limit 1
        `, [email]);
                if (customer.rows.length === 0) {
                    return false;
                }
                return customer.rows;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new UserService();
