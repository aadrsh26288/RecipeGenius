import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userData, setUserData] = useState("");
	const [loading, setLoading] = useState(false);
	const [, setCookies] = useCookies(["access_token"]);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!email || !password) {
			setError("Please enter both email and password.");
			return;
		}

		try {
			setLoading(true);
			setError(null);
			const data = await axios.post(
				"https://recipe-genius.vercel.app/auth/login",
				{
					email,
					password,
				},
			);
			console.log("res data", data);
			setUserData(data);
			setCookies("access_token", data.data.token);
			localStorage.setItem(
				"userInfo",
				JSON.stringify({
					id: data.data.userId,
					userEmail: data.data.userEmail,
				}),
			);
			navigate("/profile");
		} catch (e) {
			setLoading(false);
			setError("Invalid email or password. Please try again.");
			console.log("error", e);
		}
	};

	console.log("logged data", userData);

	return (
		<div className='mt-20 sm:max-w-[60%] sm:mx-auto mx-3 bg-white rounded-lg p-10'>
			<h2 className='text-2xl font-semibold text-center my-3'>Login</h2>

			<form className='flex flex-col justify-center' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email' className='font-semibold'>
						Email:
					</label>
					<input
						type='email'
						id='email'
						className='py-2 px-3 block w-full border-gray-200 rounded-md text-sm outline-none border-red-600 border-[1px] border'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='mt-2'>
					<label htmlFor='password' className='font-semibold'>
						Password:
					</label>
					<input
						type='password'
						id='password'
						className='py-2 px-3 block w-full border-gray-200 rounded-md text-sm outline-none border-red-600 border-[1px] border'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				{error && <p className='text-red-600 mt-2'>{error}</p>}

				<button
					type='submit'
					className='bg-red-600 mt-4 p-1 text-lg text-white rounded-md'>
					{loading === true ? "Please wait..." : "Login"}
				</button>
			</form>
		</div>
	);
};

export default Login;
