import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useCookies } from "react-cookie";
import Logo from "../img/fast-food.png";

const Navbar = () => {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const userId = JSON.parse(localStorage.getItem("userInfo"));

	const navigate = useNavigate();
	const logout = () => {
		setCookies("access_token", "");
		localStorage.removeItem("userInfo");
	};
	return (
		<>
			<div>
				<div className='flex text-[14px] justify-between sm:px-5  w-full items-center md:gap-10 bg-black text-white  '>
					<Link to='/'>
						<div className='h-12 w-12 p-2 flex items-center '>
							<img src={Logo}></img>
						</div>
					</Link>

					<div className='flex w-full items-center gap-10 '>
						<Link to='/' className='hidden md:inline'>
							<p>Home</p>
						</Link>

						{/* <Link to='/recepies'>Recepies</Link> */}
						<Link to='/create' className='hidden md:inline'>
							Create Recpies
						</Link>
						{cookies.access_token ? (
							<Link to='/savedfoods' className='hidden md:inline'>
								Saved Recpies
							</Link>
						) : (
							""
						)}
					</div>

					<div className='flex items-center gap-6 pr-4'>
						<Link to='/profile' className='flex capitalize items-center gap-2'>
							{" "}
							<FaUser className='text-lg' />
						</Link>

						<Link to='/register'>Register</Link>
						{cookies.access_token ? (
							<button
								className='bg-white px-4 p-1 text-black rounded-md '
								onClick={() => {
									logout();
								}}>
								Logout
							</button>
						) : (
							<Link to='/login'>Login</Link>
						)}
					</div>
				</div>
			</div>
			{/* for mobile ui */}
			<div className='sm:hidden bg-gray-300 w-full flex items-center justify-center gap-8 p-2'>
				<Link to='/create'>
					<p className='font-semibold'>Create </p>
				</Link>

				<Link to='/saved'>
					<p className='font-semibold'>Saved </p>
				</Link>
				<Link to='/profile'>
					<p className='font-semibold'>Profile</p>
				</Link>
			</div>
		</>
	);
};

export default Navbar;
