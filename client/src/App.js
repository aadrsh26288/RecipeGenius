import React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Create_Food from "./components/CreateFood";
import Home from "./components/Home";
import SavedFood from "./components/SavedFood";
import { useCookies } from "react-cookie";
const App = () => {
	const [cookies, setcookies] = useCookies(["access_token"]);

	console.log(cookies);

	return (
		<>
			{/* <button
				onClick={() => {
					logout();
				}}>
				logout
			</button> */}

			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/register' element={<Register />}></Route>
					<Route path='/create' element={<Create_Food />}></Route>
					{cookies.access_token ? (
						<Route path='/savedfoods' element={<SavedFood />}></Route>
					) : (
						""
					)}

					{cookies.access_token ? (
						<Route path='/profile' element={<Profile />}></Route>
					) : (
						"login"
					)}
					<Route path='/books' element={<Books />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
