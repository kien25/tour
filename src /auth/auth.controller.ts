import { Request, Response } from "express";
import UserService from "../users/users.service";
import {
  responseBadRequest,
  responseErrorInternal,
  responseNotFound,
  responseSuccess,
} from "../common/respone";
import { createHmac } from "crypto";
import authService from "./auth.service";
import usersService from "../users/users.service";
import queueService from "../queue/queue.products";
class authController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, phone, name } = req.body;
      if (!email && !password && !phone && !name) {
        return res.send(responseBadRequest("Chua nhap day du thong tin"));
      }

      const checkEmail = await UserService.checkEmail(email);
      if (checkEmail === false) {
        res.send(responseSuccess("Email da ton tai"));
      }
      const secret = process.env.HASHING_KEY;
      if (!secret) {
        res.send(responseErrorInternal);
      }
      const hash = createHmac("sha256", secret || "")
        .update(password)
        .digest("hex");

      const verifyToken = await authService.genVerifyToken({ email, phone });
      if (verifyToken === "") {
        return res.send(responseErrorInternal);
      }
      const link = `http://localhost:8000/api/v1/auth/verify?email=${email}&token=${verifyToken}`;

      const customer = await usersService.insert({
        name: name,
        phone: phone,
        password: hash,
        email: email,
        veryfy_token: verifyToken,
        verify_status: false,
      });
      await queueService.sendEmail({
        email,
        link,
      });
      return res.send(responseSuccess(customer));
    } catch (err: any) {
      return res.send(responseErrorInternal(err.message));
    }
  }
  async verify(req: Request, res: Response) {
    try {
      const { email, veryfy_token } = req.query;

      const customer = await usersService.findOneByVerfiedToken({
        email: String(email),
        veryfy_token: String(veryfy_token),
      });

      if (customer === null) {
        return res.send(responseBadRequest("Đã verified"));
      }

      const decodeData: any = await authService.verifyToken(
        String(veryfy_token)
      );
      if (customer.email !== decodeData.email) {
        return res.send(responseBadRequest("thông số không hợp lệ"));
      }

      const active = await authService.activeAccout(String(email));
      return res.send(responseSuccess(active));
    } catch (err: any) {
      return res.send(responseErrorInternal(err.message));
    }
  }
  // login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.send(
          responseBadRequest("Bạn nhập thiếu thông tin email hoặc password")
        );
      }
      const secret = process.env.HASHING_KEY;
      if (!secret) {
        res.send(responseErrorInternal);
      }
      const hash = createHmac("sha256", secret || "")
        .update(password)
        .digest("hex");

      const customer = await usersService.findOneByPassword({
        email,
        password: hash,
      });
      if (customer === null) {
        res.send(responseBadRequest("chua co email || password"));
      }
      const accessToken = authService.genAccessToken({
        id: customer.id,
        email: customer.email,
      });
      if (accessToken == "") {
        return res.send(responseErrorInternal());
      }

      return res.send(responseSuccess({ accessToken }));
    } catch (err: any) {
      return res.send(responseErrorInternal(err.message));
    }
  }
}

export default new authController();
