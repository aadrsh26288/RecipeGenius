import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Home = () => {
	const [foods, setFoods] = useState([]);
	const user = JSON.parse(localStorage.getItem("userInfo"));
	const userId = user.id;

	const [cookies] = useCookies(["access_token"]);
	const [saved, setSaved] = useState([]);
	useEffect(() => {
		const fetchFood = async () => {
			try {
				const data = await axios.get("https://recipe-genius.vercel.app/foods");
				setFoods(data.data);
			} catch (err) {
				console.log(err);
			}
		};

		const usersavedFood = async () => {
			const res = await axios.get(
				`https://recipe-genius.vercel.app/foods/savedfood/id/${userId}`,
			);
			setSaved(res.data.savedFoods);
			console.log("saved foods", res.data);
		};

		fetchFood();
		usersavedFood();
	}, []);

	console.log("saved", foods);

	const saveFood = async (foodId) => {
		try {
			await axios.put("https://recipe-genius.vercel.app/foods", {
				recipeID: foodId,
				userID: userId,
			});
			alert("Success");
		} catch (err) {
			console.log(err);
		}
	};
	// console.log(foods);

	if (foods.length === 0) {
		return (
			<div className='text-center mt-52 text-2xl font-bold'>Loading...</div>
		);
	}

	const isSaved = (id) => saved.includes(id);

	return (
		<div>
			<h2 className='text-center text-[30px] font-bold'>All foods</h2>
			<div className=''>
				<div className='md:px-0 px-2 md:max-w-[80%] mx-auto'>
					{foods.map((food) => {
						console.log(food);
						return (
							<div className='rounded-lg border-r-[12px] my-5 bg-white border-red-600 mt-2 grid  md:flex gap-2 '>
								<div className=''>
									<Link to={`/recipe/${food._id}`}>
										<img
											className='md:w-[240px] rounded-l-lg w-full h-full object-cover'
											src={`${food.imageUrl}`}
											alt={food.name}
										/>
									</Link>
								</div>

								<div className='w-full p-2 pb-4'>
									<div className='flex justify-between items-center w-full'>
										<p className='text-xl font-semibold capitalize	'>
											{food.name}
										</p>
										<p className='font-semibold text-slate-600 text-[13px]'>
											CookingTime - {food.cookingTime}min
										</p>
									</div>

									<p className='sm:inline hidden text-sm text-gray-600'>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Aliquid atque, ratione sit autem debitis obcaecati itaque
										quasi, eius neque excepturi mollitia doloribus iusto nulla,
										cum animi natus quam? Quaerat, fugiat. Placeat id sint
										dolores nesciunt facilis amet ducimus nostrum culpa possimus
										maxime. Tempora quisquam sed veritatis asperiores vero
										temporibus sunt incidunt perspiciatis distinctio saepe, enim
										eos, mollitia molestiae ab nemo.
									</p>

									<p className='inline sm:hidden text-sm text-gray-600'>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Aliquid atque, ratione sit autem debitis obcaecati itaque
										quasi, eius neque excepturi mollitia doloribus iusto nulla,
										cum animi natus quam? Quaerat, fugiat.
									</p>
									<p className=' mt-2 font-semibold text-md  capitalize '>
										Ingredients
									</p>
									{/* <p className='flex gap-10'>{food.ingredients}</p> */}
									<ul className='flex flex-wrap w-full gap-4 mt-1'>
										{food.ingredients.map((ingredient, index) => (
											<li
												key={index}
												className='bg-red-600 capitalize rounded-sm text-[12px] text-white text-center px-4 '>
												#{ingredient}
											</li>
										))}
									</ul>

									<div className='flex  justify-center sm:justify-end w-full'>
										{cookies.access_token ? (
											<button
												className='mt-4 bg-black text-white w-[150px] p-1 hover:bg-white hover:text-black cursor-pointer  hover:border hover:border-[1px] hover:border-black hover:duration-200 rounded-md'
												onClick={() => {
													saveFood(food._id);
												}}
												disabled={isSaved(food._id)}>
												{" "}
												{saved.includes(food._id) ? "Saved" : "Save"}
											</button>
										) : (
											""
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Home;
