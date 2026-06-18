// controllers/message.controller.js

const Contact = require(
  "../models/contact.model"
);

const getMessageCount = async (
  req,
  res
) => {
  
  try {
    const totalMessages =
      await Contact.countDocuments();

    res.status(200).json({
      success: true,
      totalMessages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Error getting message count",
      error: error.message,
    });
  }
};

module.exports = {
  getMessageCount,
};