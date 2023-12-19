const Razorpay = require("razorpay");

apikey = process.env.API_KEY;
apisecret = process.env.SECRET_KEY;
// console.log("apikey",apikey);
// console.log("apisecret",apisecret);
const razorpay = new Razorpay({
  key_id: apikey,
  key_secret: apisecret,
});

module.exports = razorpay;
