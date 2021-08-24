import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";

const ProfileBlock = styled(Responsive)`
	margin-top: 4rem;
`;

const ProfileHead = styled.div`
	border-bottom: 1px solid ${palette.gray[2]};
	padding-bottom: 3rem;
	margin-bottom: 3rem;
	h1 {
		font-size: 3rem;
		line-height: 1.5;
		margin: 0;
	}
`;

const ProfileContent = styled.div`
	font-size: 1.3125rem;
	color: ${palette.gray[8]};
`;

const Profile = ({ user }) => {
	if (!user) {
		return <ProfileBlock>오류 발생!</ProfileBlock>;
	}

	return (
		<ProfileBlock>
			<ProfileHead>
				<div>ID : {user.username}</div>
			</ProfileHead>
			<ProfileContent>
				<div>안녕안녕</div>
			</ProfileContent>
		</ProfileBlock>
	)
}

export default Profile;
