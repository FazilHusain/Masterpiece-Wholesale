import express from "express";

import getJournals from "../../controllers/journal/getJournals.js";
import getSingleJournal from "../../controllers/journal/getSingleJournal.js";
import getFeaturedJournal from "../../controllers/journal/getFeaturedJournal.js";
import getRelatedJournals from "../../controllers/journal/getRelatedJournals.js";

const router = express.Router();

/* ==========================================
   Public Routes
========================================== */

router.get("/", getJournals);

router.get("/featured", getFeaturedJournal);

router.get("/slug/:slug", getSingleJournal);

router.get("/related/:slug", getRelatedJournals);


export default router;