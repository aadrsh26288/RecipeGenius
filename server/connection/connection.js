const mongoose = require("mongoose");
const connectionString =
	"mongodb+srv://Aadrsh:aadrsh08@cluster0.4swxndw.mongodb.net/Users?retryWrites=true&w=majority";

const connectDB = (url) => {
	return mongoose.connect(connectionString, {
		useNewUrlParser: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
