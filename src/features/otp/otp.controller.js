import sendMail from "../../utils/sendMail.js";
import NewUserRepo from "../users/user.newRepo.js";
import OtpRepo from "./otp.repos.js";

export default class OtpController {
  constructor() {
    this.otpRepo = new OtpRepo();
    this.userRepo = new NewUserRepo();
  }
  // 1. Send OTP
  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000);

      await this.otpRepo.save(email, otp);

      await sendMail(email, `Your OTP is ${otp}`, "OTP for Password Reset");

      res.status(200).send({ msg: "OTP sent successfully to your email" });
    } catch (error) {
      console.log("Error sending OTP:", error);
      next(error);
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;

      const isValid = await this.otpRepo.verifyOtp(email, otp);
      if (!isValid) {
        return res.status(400).send({ msg: "Invalid or expired OTP" });
      }

      //   delete otp to prevent reuse
      await this.otpRepo.deleteOtp(email);

      res
        .status(200)
        .send({ msg: "OTP verified. You can now reset your password" });
    } catch (error) {
      console.log("Error verifying OTP:", error);
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, newPassword } = req.body;

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const result = await this.userRepo.resetPassword(email, hashedPassword);
      res.status(200).send(result);
    } catch (error) {
      console.log("Error resetting password:", error);
      next(error);
    }
  }
}
