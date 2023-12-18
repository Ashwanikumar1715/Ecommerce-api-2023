const razorpay = require("../config/rajorPayClient");
const orderService = require("../services/oreder.service");

const createPaymentLinkService = async (orderId) => {
  try {

    const order = await orderService.findOrderById(orderId);
    // console.log("order",order);
    const paymentLinkRequest = {
      amount: order.totalPrice * 100,
      currency: "INR",
      customer: {
        name: order.user.firstName + " " + order.user.lastName,
        contact: order.user.mobile,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `https://ashwanimartf.onrender.com/payments/${orderId}`,
      callback_method: 'get',
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    console.log("Razorpay API Response:", paymentLink)
    const paymentLinkId = paymentLink.id;
    const payment_link_url = paymentLink.short_url;

    const resData = {
      paymentLinkId,
      payment_link_url,
    };

    return resData;
  } catch (error) {
    console.error("Error in createPaymentLinkService:", error);
    throw new Error(error.message);
  }
};

const updatePaymentInformation = async (reqData) => {
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;
  
    try {
      const order = await orderService.findOrderById(orderId);
      const payment = await razorpay.payments.fetch(paymentId);
  
      if (payment.status === "captured") {
        order.paymentDetails.paymentId = paymentId;
        order.paymentDetails.status = "COMPLETED";
        order.orderStatus = "PLACED";
        await order.save();
      }
  
      const resData = {
        message: "Your order is placed",
        success: true
      };
  
      return resData;
    } catch (error) {
      // Handle the error appropriately
      console.error(error);
  
      // You might want to throw or return an error response here
      const resError = {
        message: "Error updating payment information",
        success: false
      };
  
      return resError;
    }
  };

  module.exports={
    createPaymentLinkService,
    updatePaymentInformation
  }
  
