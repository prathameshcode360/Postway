import OtpModel from "./otp.schemas.js";

export default class OtpRepo {
  // saving otp
  async save(email, otp) {
    try {
      const newOtp = new OtpModel({ email, otp });
      await newOtp.save();
      return newOtp;
    } catch (error) {
      console.log("Error while saving the otp:", error);
    }
  }
  // verifying otp
  async verifyOtp(email, otp) {
    try {
      const validOtp = await OtpModel.findOne({ email, otp });
      return validOtp;
    } catch (error) {
      console.log("Error while verifying OTP:", error);
    }
  }
  // 3. Delete OTP after verification
  async deleteOtp(email) {
    try {
      await OtpModel.deleteMany({ email });
    } catch (error) {
      console.log("Error deleting OTPs:", error);
    }
  }
}
