import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const EditFood = ({ id }) => {
	console.log("ediitit", id);
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
		userOwner: "",
	});

	useEffect(() => {
		const fetchEditFood = async () => {
			const editData = await axios.get(
				`https://recipe-genius-hlwb.vercel.app/foods/${id}`,
			);
			console.log("data to be edit", editData.data);
			if (editData.status === 200) {
				const {
					name,
					instructions,
					imageUrl,
					ingredients,
					cookingTime,
					userOwner,
				} = editData.data.data;

				setFoods({
					...foods, // Spread the existing state to keep other properties intact
					name: name,
					ingredients: ingredients,
					instructions: instructions,
					imageUrl: imageUrl,
					cookingTime: cookingTime,
					userOwner: userOwner,
				});
			}
		};
		fetchEditFood();
	}, []);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				`https://recipe-genius-hlwb.vercel.app/foods/edit/${id}`,
				{ ...foods },
			);
			alert("sucess");
		} catch (e) {
			console.log("error", e);
		}
	};

	return (
		<div>
			<p className='text-2xl font-bold text-center my-4 '>
				Update Your Recepies
			</p>

			<form
				className='flex flex-col justify-center max-w-[60%] mx-auto'
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
					className='bg-black p-1 mb-5  mt-3 rounded-md text-white'>
					Update
				</button>
			</form>
		</div>
	);
};

export default EditFood;
