import {
  responseBadRequest,
  responseErrorInternal,
  responseNotFound,
  responseSuccess,
} from "../common/respone";
import defineAbilityFor from "../users/users.ability";
import { Response, Request, NextFunction } from "express";
import commentService from "./comment.service";

class commentsController {
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { content } = req.body;
      //   console.log("checking", req.body);
      if (!content) {
        return res.send(responseBadRequest("Chua co du lieu content"));
      }
      const contentComment = await commentService.updateComment({
        idcus: Number(req.customers.idcus),
        idcmt: Number(req.params.idcmt),
        messages: String(content),
      });

      if (contentComment === null) {
        return res.send(responseNotFound("Comment not found"));
      }
      return res.send(responseSuccess(contentComment));
    } catch (error: any) {
      return res.send(responseErrorInternal(error.message));
    }
  }
}

export default new commentsController();
