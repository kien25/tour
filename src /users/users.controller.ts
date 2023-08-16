import { Request, Response } from "express";
import {
  responseBadRequest,
  responseNotFound,
  responseSuccess,
} from "../common/respone";
import UserService from "./users.service";
class UserController {
  async checkUnique(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.send(responseBadRequest("ban chua nhap email"));
      }
      const checkEmail = await UserService.checkEmail(email);
      if (checkEmail === true) {
        return res.send(responseNotFound("Khong tim thay!"));
      }
      res.send(responseSuccess(checkEmail));
    } catch (error) {
      return error;
    }
  }
  async profile(req: Request, res: Response) {
    try {
      // const user = req.user;
      const authorizationsString = req.headers.authorizations;
      console.log("authorizations", authorizationsString);
      // return res.send(responseSuccess(user));
    } catch (error) {
      res.send(error);
    }
  }
}

export default new UserController();
