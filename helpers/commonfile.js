const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const s3 = require("../config/awsS3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
dotenv.config();
const CryptoJS = require("crypto-js");
// bcrypt password
const validPassword = (dbPassword, passwordToMatch) => {
  return bcrypt.compareSync(passwordToMatch, dbPassword);
};

const safeModel = () => {
  return _.omit(this.toObject(), ["password", "__v"]);
};

const generatePassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// generateOTP
function generateOTP() {
  const digits = "123456789";
  let otp = "";
  for (let i = 1; i <= 6; i++) {
    let index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }
  return otp;
}

// send mail
let sendEmail = async (toEmail, subject, bodyHtml, attachments) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    to: toEmail,
    subject: subject,
    html: `${bodyHtml}`,
    attachments: attachments,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
// upload s3
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.SPACE_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      const key =
        path.basename(file.originalname, extname) + "-" + uuidv4() + extname;
      cb(null, key);
    },
    limits: { fileSize: 5000000000 }, // In bytes: 5000000000 bytes = 5 GB
  }),
});
// Encrypt
 const encrypt = (message) =>{
      return CryptoJS.AES.encrypt(message,  process.env.CRYPTO_SECRET).toString();
 }
// Decrypt
const decrypt = (ciphertext) =>{
  var bytes  = CryptoJS.AES.decrypt(ciphertext,  process.env.CRYPTO_SECRET);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText
}

const gradeCalculation = (perOfAttemptQuestion,avgMark) => {

  let grade
  
  switch (true) {
    case (perOfAttemptQuestion < 25):
          if(avgMark < 25){
            return grade = "D"
          }else if(avgMark >= 25 && avgMark < 50){
            return grade = "C-"
          }else if(avgMark >= 50 && avgMark < 75){
            return grade = "C"
          }else if(avgMark >= 75){
            return grade = "B-"
          }
      break;
    
    case (perOfAttemptQuestion >= 25 && perOfAttemptQuestion < 50):
          if(avgMark < 25){
            return grade = "C-"
          }else if(avgMark >= 25 && avgMark < 50){
            return grade = "C"
          }else if(avgMark >= 50 && avgMark < 75){
            return grade = "B-"
          }else if(avgMark >= 75){
            return grade = "B"
          }
      break;

    case (perOfAttemptQuestion >= 50 && perOfAttemptQuestion < 75):
          if(avgMark < 25){
            return grade = "C"
          }else if(avgMark >= 25 && avgMark < 50){
            return grade = "B-"
          }else if(avgMark >= 50 && avgMark < 75){
            return grade = "B"
          }else if(avgMark >= 75){
            return grade = "B+"
          }
      break;

    case perOfAttemptQuestion >= 75 && perOfAttemptQuestion < 100:
        if(avgMark < 25){
          return grade = "B-"
        }else if(avgMark >= 25 && avgMark < 50){
          return grade = "B"
        }else if(avgMark >= 50 && avgMark < 75){
          return grade = "B+"
        }else if(avgMark >= 75){
          return grade = "A"
        }
      break;
    
      case perOfAttemptQuestion == 100:
        console.log("100...");
        if(avgMark < 25){
          return grade = "B-"
        }else if(avgMark >= 25 && avgMark < 50){
          return grade = "B"
        }else if(avgMark >= 50 && avgMark < 75){
          return grade = "B+"
        }else if(avgMark >= 75 && avgMark < 90){
          return grade = "A"
        }else if(avgMark >= 90){
          return grade = "A+"
        }
      break;

    default:
      console.log("default log");
      break;
  }
}

module.exports = {
  validPassword,
  safeModel,
  generatePassword,
  // generateToken,
  generateOTP,
  sendEmail,
  uploadS3,
  encrypt,
  decrypt,
  gradeCalculation
};