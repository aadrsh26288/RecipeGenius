const express = require("express");
const router = express.Router();

const {
	Allfoods,
	createFood,
	getFood,
	savedfoodId,
	EditFood,
	saveFood,
	deleteFood,
	getSavedfood,
	foodsCreatedbyuser,
} = require("../controllers/Food");

router.route("").get(Allfoods);
router.route("/:id").get(getFood);
router.route("/yourrecipe/:id").get(foodsCreatedbyuser);
router.route("/savedfood/:userId").get(getSavedfood);
router.route("/savedfood/id/:userId").get(savedfoodId);
router.route("/").post(createFood);
router.route("/").put(saveFood);
router.route("/:foodId").delete(deleteFood);
router.route("/edit/:id").put(EditFood);

module.exports = router;
