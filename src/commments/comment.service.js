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
class authController {
    updateComment(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateComment = yield pg_1.pool.query(`
    UPDATE comments
    SET messages = $1
    WHERE comments.idcmt = $2
    AND comments.idcus = $3
    returning * ;
            `, [payload.messages, payload.idcmt, payload.idcus]);
                if (updateComment.rows.length === 0) {
                    return null; // not ton tai
                }
                return updateComment.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new authController();
