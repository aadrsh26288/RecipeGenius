import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userData, setUserData] = useState("");
	const [, setCookies] = useCookies(["access_token"]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("starting");

		try {
			const data = await axios.post("http://localhost:8000/auth/login", {
				email,
				password,
			});
			console.log("sucess");
			console.log(data);
			setUserData(data.data);
			setCookies("access_token", data.data.token);
			const userInfo = localStorage.setItem(
				"userInfo",
				JSON.stringify(data.data.userId),
			);
			navigate("/profile");
		} catch (e) {
			console.log("error", e);
		}
	};

	return (
		<div className='mt-20'>
			<h2 className='text-2xl font-semibold text-center my-3'>Login</h2>

			<form
				className='flex max-w-[50%] mx-auto flex-col justify-center'
				onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email' className='font-semibold'>
						Email:
					</label>
					<input
						type='email'
						id='email'
						className='py-2 px-3 block w-full border-gray-200 rounded-md text-sm outline-none border-red-600 border-[1px] border  '
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
						className='py-2 px-3  block w-full border-gray-200 rounded-md text-sm outline-none border-red-600 border-[1px] border  '
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type='submit'
					className='bg-red-600 mt-4 p-1 text-lg text-white rounded-md'>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
