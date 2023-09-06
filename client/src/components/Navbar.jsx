import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Navbar = () => {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();
	const logout = () => {
		setCookies("access_token", "");
		localStorage.removeItem("userInfo");
	};
	return (
		<div>
			<div className='flex justify-between px-5  w-full items-center gap-10 bg-black text-white  '>
				<div>
					<img
						className='w-14 h-14'
						src='https://online.kfc.co.in/static/media/kfcLogo.492728c6.svg'
					/>
				</div>

				<div className='flex w-full items-center gap-10 '>
					<Link to='/'>
						<p>Home</p>
					</Link>

					<Link to='/recepies'>Recepies</Link>
					<Link to='/create'>Create Recepies</Link>
					<Link to='/savedfoods'>Saved Recepies</Link>

					<Link to='/profile'>Profile</Link>
				</div>

				<div className='flex items-center gap-8'>
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
