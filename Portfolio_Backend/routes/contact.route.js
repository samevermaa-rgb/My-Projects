const express =
require("express");

const router =
express.Router();

const {
createContact,
getContacts,
toggleRead,
deleteContact
}=require(
"../controllers/contact.controller"
);

router.post(
"/",
createContact
);

router.get(
"/",
getContacts
);

router.put(
"/:id/read",
toggleRead
);

router.delete(
"/:id",
deleteContact
);

module.exports =
router;