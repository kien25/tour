// import exp from "constants"
import { Request, Response, NextFunction } from "express";
// import { responseFobidden } from "../common/response";
import authService from "./auth.service";
import { responseFobidden } from "../common/respone";

class AuthMiddleware {
  async jwtAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizeString = req.headers.authorization;
      if (!authorizeString) {
        return res.send(
          responseFobidden("Người dùng không cho phép truy cập tài nguyên này")
        );
      }
      const tmp = authorizeString?.split(" ");

      const decodeData: any = await authService.verifyToken(String(tmp?.[1]));

      req.customers = decodeData;
      next();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new AuthMiddleware();
