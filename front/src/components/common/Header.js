import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Responsive from "./Responsive";

const HeaderBlock = styled.div`
	position: fixed;
	width: 100%;
	background: white;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.logo {
		font-size: 1.125rem;
		font-weight: 800;
		letter-spacing: 2px;
	}
	.right {
		display: flex;
		align-items: center;
	}
	.menu {
		font-size: 0.9rem;
		font-weight: bold;
	}
`;

const Spacer = styled.div`
	height: 4rem;
`;

const UserInfo = styled.div`
	font-weight: 800;
	margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<Link to="/" className="logo">
						kunlee & jolim
					</Link>
					{user && <Link to="/" className="menu">게시글</Link>}
					{user && <Link to="/profile" className="menu">프로파일</Link>}
					{user ? (
						<div className="right">
							<UserInfo>{user.username}</UserInfo>
							<Button onClick={onLogout}>로그아웃</Button>
						</div>
					) : (
						<div className="right">
							<Button to="/login">로그인</Button>
						</div>
					)}
				</Wrapper>
			</HeaderBlock>
			<Spacer />
		</>
	)
}

export default Header;
