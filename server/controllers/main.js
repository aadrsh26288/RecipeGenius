const userModel = require("../model/model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await userModel.findOne({ email });
	if (user) {
		return res.send("user already exists");
	}
	const newUser = await userModel.create({ email, password });
	await newUser.save();
	res.json("new user created successfully");
};

const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await userModel.findOne({ email });
	if (!user) {
		return res.send("user not exists");
	}
	if (!password) {
		return res.send("password is incorrect");
	}

	const token = jwt.sign({ id: user._id }, "aadrsh");
	res.json({ token, userId: user._id, userEmail: user.email });
	// res.send("login sucess");
};

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		jwt.verify(authHeader, "aadrsh", (err) => {
			if (err) {
				return res.sendStatus(403);
			}
			next();
		});
	} else {
		res.sendStatus(401);
	}
};

module.exports = {
	login,
	register,
	verifyToken,
};
