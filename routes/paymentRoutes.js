const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripApi,
} = require("../controllers/paymentController");
const auth = require("../middlewares/auth");

router.route("/process").post(auth.protect, processPayment);
router.route("/stripeApi").get(auth.protect, sendStripApi);

module.exports = router;
