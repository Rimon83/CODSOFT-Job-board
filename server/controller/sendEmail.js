import nodemailer from "nodemailer";
import "dotenv/config";

const sendEmail = async (req, res) => {
  const { email, companyName, jobTitle } = req.body;
  // setup the nodemailer to send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //check the nodemailer if it works
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Nodemailer runs successfully");
    }
  });

  // nodemailer process
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Application",
    html: `
    <div style="background-color: #AFAFAF; color:#000; padding: 4rem; border-radius:10px; text-align:center">
    <h1>${jobTitle}</h1>
    <h2>Thank you for applying</h2>
    <p>The application is sent to ${companyName}. Good Luck</p>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      return res.status(200).json({ message: "OTP sent" });
    }
  });
};

export default sendEmail;
