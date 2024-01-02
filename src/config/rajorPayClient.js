const Razorpay = require("razorpay");

apikey = process.env.API_KEY;
apisecret = process.env.SECRET_KEY;
apikey="rzp_test_1wGKyP8oBXuBfB"
apisecret="3h5Yq9tCR11YCbgwUdnciVRP"
const razorpay = new Razorpay({
  key_id: apikey,
  key_secret: apisecret,
});

module.exports = razorpay;
