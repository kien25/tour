import { Request, Response } from "express";
import { pool } from "../config/pg";

class tourService {
  async checklistTour() {
    try {
      const tour = await pool.query(
        `
        SELECT tour.nametour, tour.danhgia, tour.describetour, tour.pricetour, vehicle.namevehicle, place.nameplace
        FROM tour join vehicle  on vehicle.idvehicle = tour.idvehicle join place on tour.idplace = place.idplace

        WHERE tour.danhgia::TEXT LIKE '%$1%'
        or tour.nametour LIKE N'%$1%'
        or tour.pricetour::TEXT LIKE '%$1%'
        or place.nameplace LIKE N'%$1%'
          `
      );
      if (tour.rows.length === 0) {
        return null; // not ton tai
      }
      return tour.rows;
    } catch (err) {
      throw err;
    }
  }

  async checkFindTour(payload: {
    tDanhgia: string;
    tNametour: string;
    tPricetour: string;
    pNamesplace: string;
  }) {
    try {
      const findTour = await pool.query(
        `
        SELECT tour.nametour, tour.danhgia, tour.describetour, tour.pricetour, vehicle.namevehicle, place.nameplace
        FROM tour join vehicle  on vehicle.idvehicle = tour.idvehicle join place on tour.idplace = place.idplace
        
        WHERE tour.danhgia::TEXT LIKE $1
        and tour.nametour LIKE  $2
        and tour.pricetour::TEXT LIKE $3
        and place.nameplace LIKE  $4;
        `,
        [
          `%${payload.tDanhgia}%`,
          `%${payload.tNametour}%`,
          `%${payload.tPricetour}%`,
          `%${payload.pNamesplace}%`,
        ]
      );

      if (findTour.rows.length === 0) {
        return null; // Không tồn tại
      }
      return findTour.rows;
    } catch (err) {
      throw err;
    }
  }

  // CHECK SEARCH
  // async checkSearch(payload: { checkSearch: string }) {
  //   try {
  //     const findTour = await pool.query(
  //       `
  //       SELECT tour.nametour, tour.danhgia, tour.describetour, tour.pricetour, vehicle.namevehicle, place.nameplace
  //       FROM tour join vehicle  on vehicle.idvehicle = tour.idvehicle join place on tour.idplace = place.idplace

  //       WHERE tour.danhgia::TEXT LIKE $1
  //       or tour.nametour LIKE  $1
  //       or tour.pricetour::TEXT LIKE $1
  //       or place.nameplace LIKE  $1;
  //       `,
  //       [`%${payload.checkSearch}%`]
  //     );

  //     if (findTour.rows.length === 0) {
  //       return null; // Không tồn tại
  //     }
  //     return findTour.rows;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // Hiển thị chi tiết thông tin 1 tour
  // cần payload trong async
  async detailIdtour(payload: { idTour: number }) {
    try {
      const detailIdtour = await pool.query(
        `
        select tour.nametour, tour.danhgia, tour.describetour, tour.pricetour,tour.slngay,place.nameplace, vehicle.namevehicle
        from tour join vehicle on tour.idvehicle = vehicle.idvehicle  
                   join place on tour.idplace = place.idplace
        WHERE idtour = $1
          `,
        [payload.idTour]
      );
      if (detailIdtour.rows.length === 0) {
        return null; // not ton tai
      }
      return detailIdtour.rows;
    } catch (err) {
      throw err;
    }
  }
}
export default new tourService();
