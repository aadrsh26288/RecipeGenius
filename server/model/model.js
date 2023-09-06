const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	savedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "foodeModel" }],
});

module.exports = mongoose.model("userModel", userSchema);
