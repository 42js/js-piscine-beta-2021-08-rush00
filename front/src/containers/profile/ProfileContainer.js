import { useSelector } from "react-redux";
import Profile from "../../components/profile/Profile";

const ProfileContainer = () => {
	const { user } = useSelector(({ user }) => ({
		user: user.user,
	}));

	return (
		<Profile
			user={user}
		/>
	)
};

export default ProfileContainer;
