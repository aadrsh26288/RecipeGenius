const express = require("express");
const router = express.Router();
const {
	Allfoods,
	createFood,
	getFood,
	savedfoodId,
	saveFood,
	getSavedfood,
} = require("../controllers/Food");

router.route("").get(Allfoods);
router.route("/:id").get(getFood);
router.route("/savedfood/:userId").get(getSavedfood);
router.route("/savedfood/id/:userId").get(savedfoodId);
router.route("/").post(createFood);
router.route("/").put(saveFood);
module.exports = router;
