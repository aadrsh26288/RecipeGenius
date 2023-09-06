const foodeModel = require("../model/food");
const userModel = require("../model/model");
const mongoose = require("mongoose");
const verifyToken = require("./main");

const Allfoods = async (req, res) => {
	try {
		const foods = await foodeModel.find({});
		res.json(foods);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while fetching foods." });
	}
};

const createFood =
	(verifyToken,
	async (req, res) => {
		try {
			const food = await foodeModel.create({
				// _id: new mongoose.Schema.Types.ObjectId(),
				name: req.body.name,
				ingredients: req.body.ingredients,
				instructions: req.body.instructions,
				imageUrl: req.body.imageUrl,
				cookingTime: req.body.cookingTime,
				userOwner: req.body.userOwner,
			});

			res.status(200).json({
				message: "success",
				data: food,
			});
		} catch (err) {
			res.send(err);
		}
	});

const getFood = async (req, res) => {
	const id = req.params.id;
	const food = await foodeModel.findById(id);
	res.json({
		message: "sucess",
		data: food,
	});
};

const saveFood = async (req, res) => {
	const recipe = await foodeModel.findById(req.body.recipeID);
	const user = await userModel.findById(req.body.userID);
	try {
		user.savedFoods.push(recipe);
		await user.save();
		res
			.status(201)
			.json({ message: "usccess", savedRecipes: user.savedRecipes });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getSavedfood = async (req, res) => {
	const user = await userModel.findById(req.params.userId);
	const savedfood = await foodeModel.find({
		_id: { $in: user.savedFoods },
	});
	res.json({ message: "success", data: savedfood });
};

const savedfoodId = async (req, res) => {
	const savedID = await userModel.findById(req.params.userId);
	res.json({ savedFoods: savedID?.savedFoods });
};

module.exports = {
	Allfoods,
	createFood,
	getFood,
	saveFood,
	getSavedfood,
	savedfoodId,
};
