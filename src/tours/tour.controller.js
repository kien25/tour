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
const tour_service_1 = __importDefault(require("./tour.service"));
class tourController {
    // listAlltour hiển thị tất cả các tour
    listAlltour(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listAlltour = yield tour_service_1.default.checklistTour();
                console.log("checkingn!!!!!", listAlltour);
                if (listAlltour === null) {
                    res.send((0, respone_1.responseBadRequest)("Chua co du lieu"));
                }
                res.send((0, respone_1.responseSuccess)("List all tour"));
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Hiển thị danh sách sản phẩm theo tên,  giá, địa điểm, số lượng ngày, đánh giá(***)
    listFindtour(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tDanhgia, tNametour, tPricetour, pNamesplace, checkSearch } = req.query;
                if (!tDanhgia &&
                    !tNametour &&
                    !tPricetour &&
                    !pNamesplace &&
                    !checkSearch) {
                    return res.send((0, respone_1.responseBadRequest)("not found!!!!"));
                }
                // listFindTour
                const listFindTour = yield tour_service_1.default.checkFindTour({
                    tDanhgia: String(tDanhgia),
                    tNametour: String(tNametour),
                    tPricetour: String(tPricetour),
                    pNamesplace: String(pNamesplace),
                });
                if (listFindTour === null) {
                    return res.send((0, respone_1.responseBadRequest)("Chua co du lieu"));
                }
                return res.send((0, respone_1.responseSuccess)("List all tour", Object(listFindTour)));
            }
            catch (err) {
                throw err;
            }
        });
    }
    //hien thi chi tiet Tour
    // async detailTour(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const { idTour } = req.query;
    //     console.log("!!!!!!!", req.query);
    //     if (!idTour) {
    //       return res.send(responseBadRequest("Không tìm thấy tour"));
    //     }
    //     const detailIdtour = await tourService.detailIdtour();
    //     console.log("checkingn!!!!!", detailIdtour);
    //     if (detailIdtour === null) {
    //       res.send(responseBadRequest("Chua co du lieu"));
    //     }
    //     res.send(responseSuccess("List all tour",detailIdtour ));
    //   } catch (err) {
    //     throw err;
    //   }
    // }
    // Hiển thị chi tiết thông tin 1 tour
    detailTour(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idTour } = req.query;
                console.log("!!!!!!!", req.query);
                if (!idTour) {
                    return res.send((0, respone_1.responseBadRequest)("Không tìm thấy tour"));
                }
                const detailIdtour = yield tour_service_1.default.detailIdtour({
                    idTour: Number(idTour),
                });
                console.log("checkingn!!!!!", detailIdtour);
                if (detailIdtour === null) {
                    return res.send((0, respone_1.responseBadRequest)("Chưa có dữ liệu"));
                }
                return res.send((0, respone_1.responseSuccess)("List all tour", Object(detailIdtour)));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new tourController();
