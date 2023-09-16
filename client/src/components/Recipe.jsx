import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Receipe = () => {
	const [data, setData] = useState(null);
	const { id } = useParams();
	useEffect(() => {
		const getRecipe = async () => {
			const res = await axios.get(
				`https://recipe-genius.vercel.app/foods/${id}`,
			);
			setData(res.data);
		};
		getRecipe();
	}, [id]);
	console.log("Receipe", data);

	if (!data || !data.data) {
		return <div>Loading...</div>; // You can display a loading indicator or an error message here
	}

	return (
		<div className='grid grid-cols-2 mt-10 max-w-[90%] mx-auto gap-8'>
			<div className='w-full'>
				<img src={data.data.imageUrl} className='object-cover w-[600px] ' />
				<button className='my-5 bg-black text-white w-full p-2'>Save</button>
			</div>
			<div>
				<h2 className='text-4xl font-semibold'>{data.data.name}</h2>
				<p className='text-sm text-indigo-400 text-justify'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta quas,
					reiciendis dolor id ex perferendis sed quo vero ab asperiores eligendi
					quisquam eveniet illo veritatis aut doloremque ad officia numquam.
					Quasi delectus dolores similique magni at non minima culpa voluptatem
					architecto dignissimos veniam amet autem possimus assumenda, minus
					cumque sunt quod alias vero, consequuntur ducimus! Sed velit tenetur
					ullam saepe. Repellat repudiandae, quasi sint hic ea facere, eos
					expedita necessitatibus doloribus reprehenderit libero voluptate quam
					autem quos fugit unde iure omnis pariatur incidunt molestias earum.
					Praesentium odit quae ex assumenda! Officia deleniti eveniet quas
					explicabo, impedit similique consequatur odit, culpa blanditiis facere
					sunt architecto excepturi. Esse neque aut ea. Laborum quas maiores
					atque obcaecati! Atque quod ex dolor pariatur deleniti. Perferendis
					iusto corrupti ullam quasi sit dicta, sint maiores voluptate velit
					beatae deleniti, itaque numquam dignissimos nam magni corporis
					distinctio quibusdam sequi facere fugiat asperiores quisquam quo.
					Asperiores, voluptate sapiente?
				</p>
				<p className='text-xl mt-3 font-semibold'>Instructions</p>
				<p className='text-sm text-indigo-500 -mt-1'>
					{data.data.instructions}
				</p>

				<div className='pb-5'>
					<h2 className='text-xl mt-2 font-semibold'>Ingredients</h2>
					<ul className='text-sm text-indigo-500 flex gap-6'>
						{data.data.ingredients.map((m, index) => {
							return (
								<li className='bg-gray-200 px-2 rounded-sm' key={index}>
									{m}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Receipe;
