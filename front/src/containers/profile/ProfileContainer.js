import Profile from "../../components/profile/Profile";

const ProfileContainer = () => {
	const username = JSON.parse(localStorage.getItem('user'));

	return (
		<Profile
			user={username}
		/>
	)
};

export default ProfileContainer;
