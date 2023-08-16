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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { responseFobidden } from "../common/response";
const auth_service_1 = __importDefault(require("./auth.service"));
const respone_1 = require("../common/respone");
class AuthMiddleware {
    jwtAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizeString = req.headers.authorization;
                if (!authorizeString) {
                    return res.send((0, respone_1.responseFobidden)("Người dùng không cho phép truy cập tài nguyên này"));
                }
                const tmp = authorizeString === null || authorizeString === void 0 ? void 0 : authorizeString.split(" ");
                const decodeData = yield auth_service_1.default.verifyToken(String(tmp === null || tmp === void 0 ? void 0 : tmp[1]));
                req.customers = decodeData;
                next();
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.default = new AuthMiddleware();
