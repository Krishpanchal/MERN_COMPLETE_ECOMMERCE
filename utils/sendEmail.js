const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  let transporter;
  let emailFrom;

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "DEVELOPMENT"
  ) {
    emailFrom = process.env.SMTP_EMAIL_FROM;

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "PRODUCTION"
  ) {
    emailFrom = process.env.EMAIL_FROM;

    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  const mailOptions = {
    from: emailFrom,
    to: options.to,
    subject: options.subject,
    html: options.message,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
