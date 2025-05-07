import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com", // Replace with your email
    pass: "your-app-password", // Replace with your Gmail App Password
  },
});

export default async function sendMail(to, text, subject) {
  const mailOptions = {
    from: "yourgmail@gmail.com", // Sender
    to, // Recipient
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
}
