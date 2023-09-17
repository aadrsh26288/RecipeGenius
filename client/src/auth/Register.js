import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.post(
			"https://recipe-genius.vercel.app/auth/register",
			{
				email,
				password,
			},
		);
		setMessage("sucess");
	};

	return (
		<div className='mt-20 bg-white rounded-lg sm:max-w-[60%] mx-3 sm:mx-auto p-10'>
			<h2 className='text-2xl font-semibold text-center'>Register</h2>
			<form
				className='flex flex-col justify-center py-5'
				onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email' className='font-semibold'>
						Email:
					</label>
					<input
						type='email'
						id='email'
						placeholder='Email'
						className='py-2 px-3 block w-full border-gray-200 rounded-md text-sm outline-none border-[1px] border  '
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
						placeholder='Password'
						className='py-2  px-3 block w-full border-gray-200 rounded-md text-sm outline-none  border-[1px] border  '
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					className='bg-red-600 mt-4 p-1 text-md text-white rounded-md'
					type='submit'>
					Register
				</button>
				<p>{message}</p>
			</form>
		</div>
	);
};

export default RegisterForm;
