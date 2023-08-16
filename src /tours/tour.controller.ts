import { Pool } from "pg";
import {
  responseBadRequest,
  responseErrorInternal,
  responseNotFound,
  responseSuccess,
} from "../common/respone";
import { Response, Request, NextFunction } from "express";
import { pool } from "../config/pg";
import tourService from "./tour.service";

class tourController {
  // listAlltour hiển thị tất cả các tour
  async listAlltour(req: Request, res: Response, next: NextFunction) {
    try {
      const listAlltour = await tourService.checklistTour();
      console.log("checkingn!!!!!", listAlltour);

      if (listAlltour === null) {
        res.send(responseBadRequest("Chua co du lieu"));
      }
      res.send(responseSuccess("List all tour"));
    } catch (err) {
      throw err;
    }
  }
  // Hiển thị danh sách sản phẩm theo tên,  giá, địa điểm, số lượng ngày, đánh giá(***)
  async listFindtour(req: Request, res: Response, next: NextFunction) {
    try {
      const { tDanhgia, tNametour, tPricetour, pNamesplace, checkSearch } =
        req.query;
      if (
        !tDanhgia &&
        !tNametour &&
        !tPricetour &&
        !pNamesplace &&
        !checkSearch
      ) {
        return res.send(responseBadRequest("not found!!!!"));
      }
      // listFindTour
      const listFindTour = await tourService.checkFindTour({
        tDanhgia: String(tDanhgia),
        tNametour: String(tNametour),
        tPricetour: String(tPricetour),
        pNamesplace: String(pNamesplace),
      });

      if (listFindTour === null) {
        return res.send(responseBadRequest("Chua co du lieu"));
      }
      return res.send(responseSuccess("List all tour", Object(listFindTour)));
    } catch (err) {
      throw err;
    }
  }

  // Hiển thị chi tiết thông tin 1 tour
  async detailTour(req: Request, res: Response, next: NextFunction) {
    try {
      const { idTour } = req.query;
      console.log("!!!!!!!", req.query);
      if (!idTour) {
        return res.send(responseBadRequest("Không tìm thấy tour"));
      }
      const detailIdtour = await tourService.detailIdtour({
        idTour: Number(idTour),
      });
      console.log("checkingn!!!!!", detailIdtour);
      if (detailIdtour === null) {
        return res.send(responseBadRequest("Chưa có dữ liệu"));
      }
      return res.send(responseSuccess("List all tour", Object(detailIdtour)));
    } catch (err) {
      next(err);
    }
  }

  //hien thi chi tiet Tour
  // async paymentinvoice(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { paybill } = req.query;
  //     console.log("!!!!!!!", req.query);
  //     if (!paybill) {
  //       return res.send(responseBadRequest("Không tìm thấy tour"));
  //     }

  //     const detailIdtour = await tourService.detailIdtour();
  //     console.log("checkingn!!!!!", detailIdtour);

  //     if (detailIdtour === null) {
  //       res.send(responseBadRequest("Chua co du lieu"));
  //     }
  //     res.send(responseSuccess("List all tour", detailIdtour));
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}

export default new tourController();
