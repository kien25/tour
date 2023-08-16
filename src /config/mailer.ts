import * as nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "vella30@ethereal.email",
    pass: "1Vnzs8J3Btj41456vg",
  },
});
