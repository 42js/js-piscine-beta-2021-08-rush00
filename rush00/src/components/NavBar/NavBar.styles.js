import styled from "styled-components";

const NavBarStyled = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #eee;
  margin: 10px 20px;
  border-radius: 5px;
  color: inherit;

  a {
    display: inline-block;
    padding: 10px 15px;
    :hover {
      color: #036581;
    }
  }
`;

NavBarStyled.LinkWrapper = styled.div`
  text-align: center;
  background-color: ${({ isActive }) => (isActive ? "#cee9ff" : "#eee")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#343a3f")};
`;

export default NavBarStyled;
