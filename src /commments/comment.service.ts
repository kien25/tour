import { Request, Response } from "express";
import { pool } from "../config/pg";
import jwt = require("jsonwebtoken");
import { transporter } from "../config/mailer";
class authController {
  async updateComment(payload: {
    idcus: number;
    idcmt: number;
    messages: string;
  }) {
    try {
      const updateComment = await pool.query(
        `
    UPDATE comments
    SET messages = $1
    WHERE comments.idcmt = $2
    AND comments.idcus = $3
    returning * ;
            `,
        [payload.messages, payload.idcmt, payload.idcus]
      );

      if (updateComment.rows.length === 0) {
        return null; // not ton tai
      }
      return updateComment.rows;
    } catch (error) {
      throw error;
    }
  }
}

export default new authController();
