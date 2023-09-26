import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Recipe from "./components/Recipe";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CreateFood from "./components/CreateFood";
import SavedFood from "./components/SavedFood";
import Profile from "./components/Profile";
import Books from "./components/Books";

const App = () => {
	const [cookies] = useCookies(["access_token"]);

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/recipe/:id' element={<Recipe />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route
					path='/create'
					element={
						cookies.access_token ? (
							<CreateFood />
						) : (
							<p>Login to create your own recipe</p>
						)
					}
				/>
				<Route
					path='/savedfoods'
					element={cookies.access_token ? <SavedFood /> : null}
				/>
				<Route
					path='/profile'
					element={
						cookies.access_token ? <Profile /> : "login to see you profile"
					}
				/>
				<Route path='/books' element={<Books />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
