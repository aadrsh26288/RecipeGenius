import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AiOutlineClose } from "react-icons/ai";
import EditFood from "./Edit";
const Profile = () => {
	const user = localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: "";

	const id = user.id;

	// console.log("user", userinfo);
	const [cookies, _] = useCookies(["acces_token"]);
	const [yourrecipes, setYourrecipes] = useState([]);
	const [modal, setModal] = useState(false);
	const [editId, setEditId] = useState("");
	const Createdrecpies = async () => {
		const result = await axios.get(
			`https://recipe-genius.vercel.app/foods/yourrecipe/${id}`,
			{ headers: { authorization: cookies.acces_token } },
		);

		setYourrecipes(result.data);
	};
	useEffect(() => {
		Createdrecpies();
	}, []);

	const deleteFood = async (foodId) => {
		if (window.confirm("Are you sure you want to delete")) {
			try {
				await axios.delete(`https://recipe-genius.vercel.app/foods/${foodId}`);
				console.log("deleted");
				Createdrecpies();
			} catch (err) {
				console.log("err", err);
			}
		}
	};

	console.log("Created", yourrecipes);

	const EditStart = (id) => {
		setEditId(id);
		setModal(!modal);
	};

	if (yourrecipes.length === 0) {
		return (
			<div className='text-center mt-52 text-2xl font-bold'>Loading...</div>
		);
	}

	return (
		<>
			{modal && (
				<div className='h-screen absolute bg-white w-full '>
					<div className='text-3xl  p-3 cursor-pointer font-bold float-right'>
						<AiOutlineClose
							className=''
							onClick={() => {
								setModal(false);
							}}
						/>
					</div>
					<EditFood id={editId} />
				</div>
			)}
			<div className='sm:max-w-[80%] mx-auto'>
				<p className='text-center my-5 text-2xl font-bold'>welcome</p>
				{/* <p>{id}</p> */}

				<div className='flex flex-col gap-8 mt-10'>
					{yourrecipes.map((recipes, index) => {
						return (
							<div className='flex sm:grid grid-cols-4 sm:max-w-[70%] gap-4 sm:gap-12 mx-auto p-1'>
								<span className='text-lg font-bold'>{index}</span>
								<img
									className='w-[50px] object-cover rounded-md '
									src={recipes.imageUrl}
								/>
								<p className='text-lg font-bold capitalize'>{recipes.name}</p>
								<div className='flex gap-4'>
									<button
										onClick={() => {
											EditStart(recipes._id);
										}}
										className='bg-indigo-400 text-black px-5 text-sm rounded-sm'>
										Edit
									</button>
									<button
										className='bg-black text-white px-5 text-sm rounded-sm'
										onClick={() => {
											deleteFood(recipes._id);
										}}>
										delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Profile;
