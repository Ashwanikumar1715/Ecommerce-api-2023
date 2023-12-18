const paymentService=require("../services/razorpay.service")



const createPaymentLinkController = async (req, res) => {
    try {
        console.log("Before creating payment link");
        const paymentLink = await paymentService.createPaymentLinkService(req.params.id);
        console.log("After creating payment link");
        
      return res.status(200).send(paymentLink);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  const updatePaymentInformation = async (req, res) => {
    try {
      await paymentService.updatePaymentInformation(req.query);
      return res.status(200).send({ message: "Payment information updated", status:true });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  module.exports={
    createPaymentLinkController,
    updatePaymentInformation
  }
   
  