const Razorpay=require('razorpay');

apikey=process.env.API_KEY
apisecret=process.env.SECRET_KEY
 const razorpay= new Razorpay({
    key_id:apikey,
    key_secret:apisecret
})

module.exports=razorpay;