const Events = require("../models/Events");

exports.getAllEvents = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.location) {
      filters.location = req.query.location;
    }
    const events = await Events.find(filters);
    res.json(events);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// get event by id

exports.getEventById = async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        error: "Events not found",
      });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.createEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    price,
    category,
    totalSeats,
    imageUrl,
  } = req.body;
  try {
    const event = await Events.create({
      title,
      description,
      date,
      location,
      price: price || 0,
      category,
      totalSeats,
      imageUrl: imageUrl || "",
      availableSeats: totalSeats,
      createdBy: req.user.id,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    price,
    category,
    totalSeats,
    imageUrl,
  } = req.body;
  try {
    const event = await Events.findByIdAndUpdate(req.params.id, {
      title,
      description,
      date,
      location,
      price,
      category,
      totalSeats,
      imageUrl,
    });
    if (!event) {
      return res.status(404).json({ error: "Events not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Events.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Events not found" });
    }
    res.json({ message: "Events deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
