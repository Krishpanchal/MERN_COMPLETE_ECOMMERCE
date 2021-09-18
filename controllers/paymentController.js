const catchAsync = require("../utils/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsync(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "INR",
    metadata: { integration_check: "accept_a_payment" },
    description: req.body.description,
    shipping: {
      name: req.body.shipping.name,
      address: {
        line1: req.body.shipping.address.line1,
        postal_code: req.body.shipping.address.postal_code,
        city: req.body.shipping.address.city,
        state: "Maharashtra",
        country: req.body.shipping.address.country,
      },
    },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

exports.sendStripApi = catchAsync(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
