import express from "express";

import protect from "../middlewares/authMiddleware.js";

import createContact from "../controllers/contact/createContact.js";
import getContacts from "../controllers/contact/getContacts.js";
import getSingleContact from "../controllers/contact/getSingleContact.js";
import updateContactStatus from "../controllers/contact/updateContactStatus.js";
import deleteContact from "../controllers/contact/deleteContact.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.post("/", createContact);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get("/", protect, getContacts);

router.get("/:id", protect, getSingleContact);

router.patch(
  "/:id/status",
  protect,
  updateContactStatus
);

router.delete(
  "/:id",
  protect,
  deleteContact
);

export default router;