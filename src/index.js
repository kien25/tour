"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_controller_1 = __importDefault(require("./users/users.controller"));
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
const auth_middlware_1 = __importDefault(require("./auth/auth.middlware"));
const users_controller_2 = __importDefault(require("./users/users.controller"));
const comment_middlware_1 = __importDefault(require("./commments/comment.middlware"));
const comment_controller_1 = __importDefault(require("./commments/comment.controller"));
const tour_controller_1 = __importDefault(require("./tours/tour.controller"));
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(cors());
app.use(express_1.default.urlencoded({ extended: true }));
//kiem tra email ton tai
app.post("/api/v1/user/checkunique", users_controller_1.default.checkUnique);
// đăng kí
app.post("/api/v1/auth/register", auth_controller_1.default.register);
// xác nhận
app.get("/api/v1/auth/verify", auth_controller_1.default.verify);
// đăng nhập
app.post("/api/v1/auth/login", auth_controller_1.default.login);
// Hiển thị tất cả  tour
app.get("/api/v1/tour/listAlltour", tour_controller_1.default.listAlltour);
// Hiển thị danh sách sản phẩm theo tên,  giá, địa điểm, số lượng ngày, đánh giá(***)
// Searh mọi kí tự từ param
app.get("/api/v1/tour/listFindtour", tour_controller_1.default.listFindtour);
// Hiển thị chi tiết thông tin 1 tour
app.get("/api/v1/tour/detail", tour_controller_1.default.detailTour);
// phân quyền
app.use(auth_middlware_1.default.jwtAccessToken);
app.get("/api/v1/users/profile", users_controller_2.default.profile);
app.patch("/api/v1/comments/:id", comment_middlware_1.default.checkPermission, comment_controller_1.default.update);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
