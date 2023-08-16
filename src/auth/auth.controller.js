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
const users_service_1 = __importDefault(require("../users/users.service"));
const respone_1 = require("../common/respone");
const crypto_1 = require("crypto");
const auth_service_1 = __importDefault(require("./auth.service"));
const users_service_2 = __importDefault(require("../users/users.service"));
const queue_products_1 = __importDefault(require("../queue/queue.products"));
class authController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, phone, name } = req.body;
                if (!email && !password && !phone && !name) {
                    return res.send((0, respone_1.responseBadRequest)("Chua nhap day du thong tin"));
                }
                const checkEmail = yield users_service_1.default.checkEmail(email);
                if (checkEmail === false) {
                    res.send((0, respone_1.responseSuccess)("Email da ton tai"));
                }
                const secret = process.env.HASHING_KEY;
                if (!secret) {
                    res.send(respone_1.responseErrorInternal);
                }
                const hash = (0, crypto_1.createHmac)("sha256", secret || "")
                    .update(password)
                    .digest("hex");
                const verifyToken = yield auth_service_1.default.genVerifyToken({ email, phone });
                if (verifyToken === "") {
                    return res.send(respone_1.responseErrorInternal);
                }
                const link = `http://localhost:8000/api/v1/auth/verify?email=${email}&token=${verifyToken}`;
                const customer = yield users_service_2.default.insert({
                    name: name,
                    phone: phone,
                    password: hash,
                    email: email,
                    veryfy_token: verifyToken,
                    verify_status: false,
                });
                yield queue_products_1.default.sendEmail({
                    email,
                    link,
                });
                return res.send((0, respone_1.responseSuccess)(customer));
            }
            catch (err) {
                return res.send((0, respone_1.responseErrorInternal)(err.message));
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, veryfy_token } = req.query;
                const customer = yield users_service_2.default.findOneByVerfiedToken({
                    email: String(email),
                    veryfy_token: String(veryfy_token),
                });
                if (customer === null) {
                    return res.send((0, respone_1.responseBadRequest)("Đã verified"));
                }
                const decodeData = yield auth_service_1.default.verifyToken(String(veryfy_token));
                if (customer.email !== decodeData.email) {
                    return res.send((0, respone_1.responseBadRequest)("thông số không hợp lệ"));
                }
                const active = yield auth_service_1.default.activeAccout(String(email));
                return res.send((0, respone_1.responseSuccess)(active));
            }
            catch (err) {
                return res.send((0, respone_1.responseErrorInternal)(err.message));
            }
        });
    }
    // login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.send((0, respone_1.responseBadRequest)("Bạn nhập thiếu thông tin email hoặc password"));
                }
                const secret = process.env.HASHING_KEY;
                if (!secret) {
                    res.send(respone_1.responseErrorInternal);
                }
                const hash = (0, crypto_1.createHmac)("sha256", secret || "")
                    .update(password)
                    .digest("hex");
                const customer = yield users_service_2.default.findOneByPassword({
                    email,
                    password: hash,
                });
                if (customer === null) {
                    res.send((0, respone_1.responseBadRequest)("chua co email || password"));
                }
                const accessToken = auth_service_1.default.genAccessToken({
                    id: customer.id,
                    email: customer.email,
                });
                if (accessToken == "") {
                    return res.send((0, respone_1.responseErrorInternal)());
                }
                return res.send((0, respone_1.responseSuccess)({ accessToken }));
            }
            catch (err) {
                return res.send((0, respone_1.responseErrorInternal)(err.message));
            }
        });
    }
}
exports.default = new authController();
