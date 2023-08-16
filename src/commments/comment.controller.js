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
const comment_service_1 = __importDefault(require("./comment.service"));
class commentsController {
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { content } = req.body;
                //   console.log("checking", req.body);
                if (!content) {
                    return res.send((0, respone_1.responseBadRequest)("Chua co du lieu content"));
                }
                const contentComment = yield comment_service_1.default.updateComment({
                    idcus: Number(req.customers.idcus),
                    idcmt: Number(req.params.idcmt),
                    messages: String(content),
                });
                if (contentComment === null) {
                    return res.send((0, respone_1.responseNotFound)("Comment not found"));
                }
                return res.send((0, respone_1.responseSuccess)(contentComment));
            }
            catch (error) {
                return res.send((0, respone_1.responseErrorInternal)(error.message));
            }
        });
    }
}
exports.default = new commentsController();
