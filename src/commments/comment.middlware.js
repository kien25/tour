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
const users_ability_1 = __importDefault(require("../users/users.ability"));
class commetsMiddleware {
    checkPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("customerid", req.customers.id);
                console.log("params", req.params.id);
                const ability = yield (0, users_ability_1.default)(req.customers);
                if (ability.can("update", "Comment")) {
                    next();
                }
                else {
                    return res.send((0, respone_1.responseFobidden)("Nguoi dung khong co quuyen!!!!"));
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new commetsMiddleware();
