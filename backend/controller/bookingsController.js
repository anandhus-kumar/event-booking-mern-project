const Bookings = require("../models/Bookings");
const Events = require("../models/Events");
const OTP = require("../models/OTP");
const { sendOtpEmails, sendBookingEmail } = require("../utils/email");

const generateOTP = () => {
  Math.floor(100000 + Math.random() * 900000).toString();
};

// create booking
exports.bookEvent = async (req, res) => {
  const { eventId, otp } = req.body;
  const otpRecord = await OTP.findOne({
    email: req.user.email,
    otp,
    action: "event_booking",
  });
  if (!otpRecord) {
    return res.status(400).json({ error: "Otp not verified " });
  }
  const event = await Events.findById(eventId);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  if (event.totalSeats <= 0) {
    return res.status(400).json({ error: "No Seats available" });
  }
  const existingBooking = await Bookings.findOne({
    userId: req.user._id,
    eventId,
  });
  if (existingBooking) {
    return res.status(400).json({
      error: "You already booked this event",
    });
  }
  const booking = await Bookings.create({
    userId: req.user._id,
    eventId,
    status: "pending",
    paymentStatus: "non_paid",
    amount: event.price,
  });
  await OTP.deleteMany({ email: req.user.email, action: "event_booking" });
  await sendBookingEmail(req.user.email, event.title, booking._id);
  res.status(201).json({
    message: "Booking created successfully",
    booking,
  });
};

// booking otp send

exports.sendBookingOTP = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(otp);
  try {
    await OTP.findOneAndDelete({
      email: req.user.email,
      action: "event_booking",
    });
    await OTP.create({ email: req.user.email, otp, action: "event_booking" });
    await sendOtpEmails(req.user.email, otp, "event_booking");
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
};

// get booking details
exports.getMyBookings = async (req, res) => {
  const booking = await Bookings.find({ userId: req.user._id }).populate(
    "eventId",
  );
  res.json(booking);
};

// confirm the booking by admin
exports.confirmBooking = async (req, res) => {
  const paymentStatus = req.body.paymentStatus;
  if (!["paid", "non_paid"].includes(paymentStatus)) {
    return res.status(400).json({ error: "Invalid payment status" });
  }

  const booking = await Bookings.findById(req.params.id).populate("eventId");
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  if (booking.status === "confirmed") {
    return res.status(400).json({ error: "Booking alredy confirmed" });
  }

  const event = await Event.findById(booking.eventId._id);
  if (event.totalSeats <= 0) {
    return res.status(400).json({ error: "No seats available" });
  }

  booking.status = "confirmed";
  if (paymentStatus) {
    booking.paymentStatus = paymentStatus;
  }
  await booking.save();
  event.totalSeats -= 1;
  await event.save();
  await sendBookingEmail(req.user.email, event.title, booking._id);
  res.json({ message: "Booking confirmed" });
};

// delete  booking
exports.cancelBooking = async (req, res) => {
  const booking = await Bookings.findById({ userId: req.user._id });
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  if (booking.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  booking.status = "cancelled";
  await booking.save();
  if (booking.status === "confirmed") {
    const event = await Events.findById(booking.eventId._id);
    event.totalSeats += 1;
    await event.save();
  }
  await booking.remove();
  res.json({ message: "Booking cancelled" });
};
