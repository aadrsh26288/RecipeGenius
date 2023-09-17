import React, { useState, useEffect } from "react";
import axios from "axios";
const SavedFood = () => {
	const [savedfoods, setSavedfood] = useState([]);
	const userId = JSON.parse(localStorage.getItem("userInfo"));
	useEffect(() => {
		const getSavedfood = async () => {
			const res = await axios.get(
				`https://recipe-genius.vercel.app/foods/savedfood/${userId}`,
			);
			setSavedfood(res.data.data);
		};

		getSavedfood();
	}, []);

	if (savedfoods.length === 0) {
		return (
			<div className='text-center mt-52 text-2xl font-bold'>Loading...</div>
		);
	}

	console.log("saved foods by user", savedfoods);
	return (
		<div>
			<h1 className='text-2xl font-semibold text-center 	 my-5'>Saved food</h1>
			{/* <p>{savedfoods.data.name}</p> */}
			<div className='grid md:grid-cols-3 gap-10 p-5'>
				{savedfoods.map((food) => {
					return (
						<div className='group relative cursor-pointer  overflow-hidden'>
							{/* <p>{food.name}</p> */}

							<img
								className='h-full object-cover  rounded-xl '
								src={`${food.imageUrl}`}
							/>
							<div className='hidden w-full h-full  rounded-xl group-hover:flex justify-center transition delay-700 duration-300 ease-in-out items-center backdrop-brightness-75 p-2 absolute top-0 '>
								<span className='w-full text-center   text-6xl font-bold capitalize text-white '>
									{food.name}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SavedFood;
