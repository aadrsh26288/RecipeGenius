const express = require("express");
const app = express();
const mainrouter = require("./routes/main");
const foodRouter = require("./routes/food");
const connectDB = require("./connection/connection");
const cors = require("cors");

app.use(cors());
const allowedOrigins = [
	"http://localhost:3000",
	"https://recipe-genius-2idj.vercel.app/",
	// Add other origins as needed
];

const corsOptions = {
	origin: allowedOrigins,
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Allow specific origin(s)

app.use(express.json());
app.use("/auth", mainrouter);
app.use("/foods", foodRouter);
const PORT = 8000;
const start = async () => {
	await connectDB();
	try {
		app.listen(PORT, () => {
			console.log(`Server is listening on port 8000..`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
