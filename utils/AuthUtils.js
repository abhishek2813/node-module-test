const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const SECRETKEY = "This is for module test";
/**
 * @function - cleaning the data for registration
 * @param {email : String, username, name, password: Boolean}
 * @returns  - return a promise either resolve or reject with errors
 */
const cleanupAndValidate = ({ email, username, name, password }) => {
  return new Promise((resolve, reject) => {
    if (!email || !username || !name || !password) {
      reject("Missing Credentials");
    }

    if (typeof email !== "string") reject("Invalid Email");
    if (typeof username !== "string") reject("Invalid Username");
    if (typeof password !== "string") reject("Invalid Password");

    if (username.length <= 2 || username.length > 50) {
      reject("username should be 3-50 charachters");
    }
    if (password.length <= 2 || username.password > 50) {
      reject("password should be 3-20 charachters");
    }

    if (!validator.isEmail(email)) {
      reject("Invalid Email Format");
    }

    resolve();
  });
};

const genrateJWTToken = (email) => {
  const token = jwt.sign(email, SECRETKEY);
  return token;
};

const sendVerificationToken = ({ email, token }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
      user: "abhishekp282002@gmail.com",
      pass: "jnhwxxgmamslvkdh",
    },
  });

  const mailOptions = {
    from: "abhishekp282002@gmail.com",
    to: email,
    subject: "Email verification for Book APP",
    html: `Click <a href='https://node-module-test-production-9541.up.railway.app/api/${token}'>Here</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully: " + info.response);
    }
  });

  return;
};
module.exports = { cleanupAndValidate,genrateJWTToken,sendVerificationToken };