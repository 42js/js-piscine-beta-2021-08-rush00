import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="NavBar">
            <ul>
                <li>
                    <Link to="/">글목록</Link>
                </li>
                <li>
                    <Link to="/article/create">글쓰기</Link>
                </li>
                <li>
                    <Link to="/profile">프로필</Link>
                </li>
                <li>
                    <Link to="/signup">회원가입</Link>
                </li>
                <li>
                    <Link to="/signin">로그인</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
