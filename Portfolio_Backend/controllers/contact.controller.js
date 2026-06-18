const Contact = require("../models/contact.model");

/* CREATE CONTACT */

const createContact = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields required",
      });
    }

    const newContact =
      await Contact.create({
        name,
        email,
        subject:
          subject ||
          "New Contact Message",
        message,
      });

    res.status(201).json({
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL */

const getContacts = async (
  req,
  res
) => {
  try {
    const contacts =
      await Contact.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* TOGGLE READ */

const toggleRead =
  async (req, res) => {
    try {
      const contact =
        await Contact.findById(
          req.params.id
        );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message:
            "Message not found",
        });
      }

      contact.read =
        !contact.read;

      await contact.save();

      res.status(200).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/* DELETE */

const deleteContact =
  async (req, res) => {
    try {
      await Contact.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createContact,
  getContacts,
  toggleRead,
  deleteContact,
};