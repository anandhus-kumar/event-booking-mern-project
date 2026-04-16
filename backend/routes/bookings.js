const express = require("express");
const { protect, admin } = require("../middleware/auth");
const {
  bookEvent,
  sendBookingOTP,
  getMyBookings,
  confirmBooking,
  cancelBooking,
} = require("../controller/bookingsController");
const router = express.Router();

router.post("/", protect, bookEvent);
router.post("/verify-otp", protect, sendBookingOTP);
router.get("/my-bookings", protect, getMyBookings);
router.put("/:id/confirm", protect, admin, confirmBooking);
router.delete("/:id", protect, cancelBooking);

module.exports = router;
