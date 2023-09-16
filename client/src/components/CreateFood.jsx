import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
	// const userID = window.localStorage.getItem("userInfo")
	const navigate = useNavigate();
	const [cookies, _] = useCookies(["acces_token"]);
	const userID = localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: "";
	const [foods, setFoods] = useState({
		name: "",
		ingredients: [""],
		instructions: "",
		imageUrl: "",
		cookingTime: 0,
		userOwner: userID,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFoods({ ...foods, [name]: value });
	};

	const handleIngredient = (event, index) => {
		try {
			const { value } = event.target;
			const newFood = [...foods.ingredients];
			newFood[index] = value;
			setFoods({ ...foods, ingredients: newFood });
		} catch (e) {
			console.log("errpr", e);
		}
	};
	const handleFoodAdd = () => {
		setFoods({ ...foods, ingredients: [...foods.ingredients, ""] });
	};
	console.log("food", foods);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				"http://localhost:8000/foods",
				{ ...foods },
				{ headers: { authorization: cookies.acces_token } },
			);
			alert("sucess");
		} catch (e) {
			console.log("error", e);
		}
		setFoods({
			name: "",
			ingredients: [""],
			instructions: "",
			imageUrl: "",
			cookingTime: 0,
			userOwner: "",
		});
		navigate("/");
	};

	return (
		<div>
			<p className='text-2xl font-bold text-center my-4 '>
				Cerate Your Own Recepies
			</p>

			<form
				className='flex flex-col justify-center max-w-[70%] mx-auto'
				onSubmit={handleSubmit}>
				<div>
					<p>Name</p>
					<input
						type='text'
						name='name'
						className='py-2 px-3  block w-full  rounded-md text-sm outline-none border-black border-[1px] border  '
						placeholder='Name Of Your Receipe'
						value={foods.name}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>

				{/* <div>
					<p>description</p>
					<input
						type='text'
						className='border-[1px] border outline-none p-1  border-gray-600'
						name='description'
						placeholder='description'
						value={foods.description}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div> */}

				<div>
					<p>Ingredients</p>
					{foods.ingredients.map((food, index) => (
						<input
							type='text'
							key={index}
							placeholder='Ingredients'
							className='py-2 px-3 my-1  block w-full  rounded-md text-sm outline-none border-black border-[1px] border  '
							name='ingredients'
							value={food}
							onChange={(event) => {
								handleIngredient(event, index);
							}}
						/>
					))}

					<button
						type='button'
						className='bg-black float-right text-white text-[12px] p-1 px-6 mt-1 rounded-md'
						onClick={() => {
							handleFoodAdd();
						}}>
						Add Ingredient
					</button>
				</div>

				<div>
					<p>Instructions</p>
					<input
						type='text'
						name='instructions'
						placeholder='Instructions'
						className='py-2 px-3 my-1  block w-full  rounded-md text-sm outline-none border-black border-[1px] border  '
						value={foods.instructions}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>

				<div>
					<p>ImageUrl</p>
					<input
						type='text'
						name='imageUrl'
						className='py-2 px-3 my-1  block w-full  rounded-md text-sm outline-none border-black border-[1px] border  '
						placeholder='ImageUrl'
						value={foods.imageUrl}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>

				<div>
					<p>CookingTime</p>
					<input
						type='number'
						name='cookingTime'
						className='py-2 px-3 my-1  block w-full  rounded-md text-sm outline-none border-black border-[1px] border  '
						placeholder='CookingTime'
						value={foods.cookingTime}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>
				<button
					type='submit'
					className='bg-black p-1  mt-3 rounded-md text-white'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default CreateFood;
