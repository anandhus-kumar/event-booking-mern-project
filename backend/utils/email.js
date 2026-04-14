const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendOtpEmails = async (email, otp, type) => {
  try {
    const title =
      type === "account_verification"
        ? "Verify your EventHive Account"
        : "EventHive Booking Verification";
    const msg =
      type === "account_verification"
        ? "Please use the following OTP to verify your new account."
        : "Please use the following OTP to verify and confirm your event booking";

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: title,
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      
      <h1 style="color: #ea580c; margin-bottom: 10px;">EventHive</h1>
      
      <h2 style="color: #111827; margin-bottom: 20px;">
        ${title}
      </h2>

      <p style="color: #4b5563; font-size: 16px; margin-bottom: 30px;">
        ${msg}
      </p>

      <div style="background: #fff7ed; border: 2px dashed #ea580c; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <span style="font-size: 32px; font-weight: bold; color: #ea580c; letter-spacing: 5px;">
          ${otp}
        </span>
      </div>

      <p style="color: #6b7280; font-size: 14px;">
        This OTP is valid for 10 minutes. Please do not share it with anyone.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p style="color: #9ca3af; font-size: 12px;">
        If you did not request this, please ignore this email.
      </p>

    </div>

  </div>
`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP send to ${email} for ${type}`);
  } catch (error) {
    console.error(`Error sending OTP  to ${email} for ${type}`, error);
  }
};

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: `Booking confirmed:${eventTitle}`,
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      
      <h1 style="color: #ea580c; margin-bottom: 10px;">EventHive</h1>
      
      <h2 style="color: #111827; margin-bottom: 20px;">
      Hi ${userName}  🎉 Booking Confirmed!
      </h2>

      <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">
        Your booking has been successfully confirmed for:
      </p>

      <div style="background: #fff7ed; border-left: 5px solid #ea580c; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
        <p style="font-size: 18px; font-weight: bold; color: #ea580c; margin: 0;">
          ${eventTitle}
        </p>
      </div>

      <p style="color: #4b5563; font-size: 15px; margin-bottom: 25px;">
        We’re excited to have you join us 🎊<br/>
        Please keep this email for your reference.
      </p>

      <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
        <p style="margin: 0; font-size: 14px; color: #374151;">
          📅 Make sure to arrive on time and bring any required documents.
        </p>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p style="color: #9ca3af; font-size: 12px;">
        If you have any questions, feel free to contact support.
      </p>

    </div>

  </div>
`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("error in booking", error);
  }
};

module.exports = {
  sendOtpEmails,
  sendBookingEmail,
};
