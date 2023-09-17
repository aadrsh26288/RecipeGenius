import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useCookies } from "react-cookie";
import Logo from "../img/fast-food.png";
const Navbar = () => {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();
	const logout = () => {
		setCookies("access_token", "");
		localStorage.removeItem("userInfo");
	};
	return (
		<div>
			<div className='flex text-[14px] justify-between px-5  w-full items-center md:gap-10 bg-black text-white  '>
				<div className='h-14 w-14 flex items-center '>
					<Link to='/'>
						<img src={Logo}></img>
					</Link>
				</div>

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

				<div className='flex items-center gap-6'>
					<Link to='/profile'>
						{" "}
						<FaUser className='text-xl' />
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
	);
};

export default Navbar;
