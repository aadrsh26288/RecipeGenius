import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import EditFood from "./Edit";
const Profile = () => {
	const id = localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: "";
	// console.log("user", userinfo);
	const [cookies, _] = useCookies(["acces_token"]);
	const [yourrecipes, setYourrecipes] = useState([]);
	const [modal, setModal] = useState(false);
	const [editId, setEditId] = useState("");
	const Createdrecpies = async () => {
		const result = await axios.get(
			`http://localhost:8000/foods/yourrecipe/${id}`,
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
				await axios.delete(`http://localhost:8000/foods/${foodId}`);
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

	return (
		<>
			{modal && (
				<div className='h-screen absolute bg-white w-full '>
					<div>
						<p>modal open</p>
						<button
							onClick={() => {
								setModal(false);
							}}>
							close
						</button>
					</div>
					<EditFood id={editId} />
				</div>
			)}
			<div className='max-w-[80%] mx-auto'>
				<p className='text-center my-5 text-2xl font-bold'>welcome</p>
				{/* <p>{id}</p> */}

				<div className='flex flex-col gap-8 mt-10'>
					{yourrecipes.map((recipes, index) => {
						return (
							<div className='grid grid-cols-4 max-w-[70%] gap-12 mx-auto p-1'>
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
