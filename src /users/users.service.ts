import { Request, Response } from "express";
import { pool } from "../config/pg";
import { UserCreatePayload } from "./users.interface";

class UserService {
  async checkEmail(email: string) {
    try {
      const customer = await pool.query(
        `
        select*from customers 
        where email = $1
        limit 1
        `,
        [email]
      );
      if (customer.rows.length === 0) {
        return true; // not ton tai
      }
      return false;
    } catch (err) {
      throw err;
    }
  }
  async insert(payload: UserCreatePayload) {
    try {
      const customer = await pool.query(
        `
          INSERT INTO customers (name, phone, email, password, veryfy_token, verify_status)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email
        `,
        [
          payload.name,
          payload.phone,
          payload.email,
          payload.password,
          payload.veryfy_token,
          payload.verify_status,
        ]
      );
      if (customer.rows.length === 0) {
        return null;
      }

      return customer.rows[0];
    } catch (err) {
      throw err;
    }
  }
  async findOneByVerfiedToken(payload: {
    email: string;
    veryfy_token: string;
  }) {
    try {
      const customer = await pool.query(
        `
          SELECT *
          FROM customers
          WHERE email = $1
            AND veryfy_token = $2
            AND verify_status = $3
          LIMIT 1
        `,
        [payload.email, payload.veryfy_token, false]
      );
      if (customer.rows.length === 0) {
        return null;
      }
      return customer.rows[0];
    } catch (err) {
      throw err;
    }
  }
  async findOneByPassword(payload: { email: string; password: string }) {
    try {
      const customer = await pool.query(
        `
        SELECT *
        FROM customers
        WHERE email = $1
        LIMIT 1
      `,
        [payload.email]
      );
      if (customer.rows.length === 0) {
        return null;
      }
      const data = customer.rows[0];

      if (data.password !== payload.password) {
        return null;
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
