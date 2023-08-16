import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userController from "./users/users.controller";
import authController from "./auth/auth.controller";
import authMiddleware from "./auth/auth.middlware";
import usersController from "./users/users.controller";
import commetsMiddleware from "./commments/comment.middlware";
import commentController from "./commments/comment.controller";
import tourController from "./tours/tour.controller";
const cors = require("cors");
dotenv.config();
declare global {
  namespace Express {
    interface Request {
      customers?: any;
    }
  }
}

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//kiem tra email ton tai
app.post("/api/v1/user/checkunique", userController.checkUnique);
// đăng kí
app.post("/api/v1/auth/register", authController.register);

// xác nhận
app.get("/api/v1/auth/verify", authController.verify);

// đăng nhập
app.post("/api/v1/auth/login", authController.login);

// Hiển thị tất cả  tour
app.get("/api/v1/tour/listAlltour", tourController.listAlltour);

// Hiển thị danh sách sản phẩm theo tên,  giá, địa điểm, số lượng ngày, đánh giá(***)
// Searh mọi kí tự từ param
app.get("/api/v1/tour/listFindtour", tourController.listFindtour);
// Hiển thị chi tiết thông tin 1 tour
app.get("/api/v1/tour/detail", tourController.detailTour);

// Tạo thanh toán hoá đơn
// app.get("/api/v1/tour/pay", tourController.paymentinvoice);

// phân quyền
app.use(authMiddleware.jwtAccessToken);
app.get("/api/v1/users/profile", usersController.profile);

app.patch(
  "/api/v1/comments/:id",
  commetsMiddleware.checkPermission,
  commentController.update
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
