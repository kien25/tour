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
const respone_1 = require("../common/respone");
const users_service_1 = __importDefault(require("./users.service"));
class UserController {
    checkUnique(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return res.send((0, respone_1.responseBadRequest)("ban chua nhap email"));
                }
                const checkEmail = yield users_service_1.default.checkEmail(email);
                if (checkEmail === true) {
                    return res.send((0, respone_1.responseNotFound)("Khong tim thay!"));
                }
                res.send((0, respone_1.responseSuccess)(checkEmail));
            }
            catch (error) {
                return error;
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const user = req.user;
                const authorizationsString = req.headers.authorizations;
                console.log("authorizations", authorizationsString);
                // return res.send(responseSuccess(user));
            }
            catch (error) {
                res.send(error);
            }
        });
    }
}
exports.default = new UserController();
