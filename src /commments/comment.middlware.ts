import { subject } from "@casl/ability";
import { responseFobidden } from "../common/respone";
import defineAbilityFor from "../users/users.ability";
import { Response, Request, NextFunction } from "express";

class commetsMiddleware {
  async checkPermission(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("customerid", req.customers.id);
      console.log("params", req.params.id);
      const ability = await defineAbilityFor(req.customers);

      if (ability.can("update", "Comment")) {
        next();
      } else {
        return res.send(responseFobidden("Nguoi dung khong co quuyen!!!!"));
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new commetsMiddleware();
