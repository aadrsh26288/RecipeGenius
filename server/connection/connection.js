const mongoose = require("mongoose");
const MONGO_URL =
	"mongodb+srv://Aadrsh:aadrsh08@cluster0.4swxndw.mongodb.net/Users?retryWrites=true&w=majority";

const connectDB = (url) => {
	return mongoose.connect(MONGO_URL, {
		useNewUrlParser: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
