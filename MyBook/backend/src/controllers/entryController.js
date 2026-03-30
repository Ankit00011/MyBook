const Entry = require("../models/entryModel");
const validator = require("validator");

const normalizeEntryInput = (body = {}) => ({
  date: typeof body.date === "string" ? body.date.trim() : "",
  mood: typeof body.mood === "string" ? body.mood.trim() : "",
  title: typeof body.title === "string" ? body.title.trim() : "",
  content: typeof body.content === "string" ? body.content.trim() : "",
});

const validateEntryInput = ({ date, mood, title, content }) => {
  if (!title || !content || !mood || !date) {
    return "Please submit with required fields!";
  }

  if (!validator.isDate(date, { format: "YYYY-MM-DD", strictMode: true })) {
    return "Please provide a valid date!";
  }

  if (title.length > 20) {
    return "Title length should not be more than 20 characters!";
  }

  if (content.length > 1500) {
    return "Content length should not be more than 1500 characters";
  }

  return null;
};

const handleEntryError = (error, res, action) => {
  console.error(`Error ${action} entry!: `, error);

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(422).json({
      message:
        Object.values(error.errors || {})[0]?.message ||
        "Please provide valid entry details!",
    });
  }

  return res.status(500).json({
    message: "Something went wrong! Please try again later!",
  });
};

const createEntry = async (req, res) => {
  const { date, mood, title, content } = normalizeEntryInput(req.body);
  const loggedUser = req.user;

  const validationError = validateEntryInput({ date, mood, title, content });
  if (validationError) {
    return res.status(422).json({ message: validationError });
  }

  try {
    const saveEntry = await Entry.create({
      createdBy: loggedUser._id,
      date,
      title,
      mood,
      content,
    });

    res.status(201).json({
      message: "Entry added successfully!",
      saveEntry,
    });
  } catch (error) {
    return handleEntryError(error, res, "adding");
  }
};

const getEntries = async (req, res) => {
  const loggedUser = req.user;

  try {
    const entries = await Entry.find({ createdBy: loggedUser._id })
      .populate("createdBy", "firstName lastName")
      .sort({ date: -1 });

    res
      .status(200)
      .json({ message: "Entries fetched successfully!", data: entries });
  } catch (error) {
    console.error("Error fetching entries!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const getEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;

  try {
    const entry = await Entry.findOne({
      _id: entryId,
      createdBy: loggedUser._id,
    }).populate("createdBy", "firstName lastName");

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or does not belong to the logged-in user!",
      });
    }

    res
      .status(200)
      .json({ message: "Entry fetched successfully!", data: entry });
  } catch (error) {
    console.error("Error fetching this entry!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const updateEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;
  const { date, title, mood, content } = normalizeEntryInput(req.body);

  const validationError = validateEntryInput({ date, mood, title, content });
  if (validationError) {
    return res.status(422).json({ message: validationError });
  }

  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: entryId, createdBy: loggedUser._id },
      { date, title, mood, content },
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or not updated due to permissions!",
      });
    }

    res
      .status(200)
      .json({ message: "Entry updated successfully!", data: entry });
  } catch (error) {
    return handleEntryError(error, res, "updating");
  }
};

const deleteEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;

  try {
    const entry = await Entry.findOneAndDelete({
      _id: entryId,
      createdBy: loggedUser._id,
    });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or not deleted due to permissions!",
      });
    }

    res
      .status(200)
      .json({ message: "Entry deleted successfully!", data: entry });
  } catch (error) {
    console.error("Error deleting this entry!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

const searchEntries = async (req, res) => {
  const loggedUser = req.user;
  const queryText = req.query.text;

  if (!queryText?.trim()) {
    return res.status(400).json({ message: "Search text is required!" });
  }

  if (queryText.length > 100) {
    return res
      .status(422)
      .json({ message: "Search string cannot be exceed 100 charactere!" });
  }

  try {
    const entries = await Entry.find({
      $and: [
        {
          $or: [
            { title: { $regex: queryText, $options: "i" } },
            { content: { $regex: queryText, $options: "i" } },
          ],
        },
        { createdBy: loggedUser._id },
      ],
    }).sort({ date: -1 });

    res.status(200).json({
      message:
        entries.length === 0
          ? "No entries found!"
          : "Entries fetched successfully!",
      data: entries,
    });
  } catch (error) {
    console.error("Error searching the entry!", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  searchEntries,
};
