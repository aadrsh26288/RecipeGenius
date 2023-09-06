import React, { useEffect } from "react";

const Profile = () => {
	const userinfo = localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: "";
	console.log("user", userinfo);
	return (
		<div>
			<p>welcome</p>
			<p>{userinfo}</p>
		</div>
	);
};

export default Profile;
