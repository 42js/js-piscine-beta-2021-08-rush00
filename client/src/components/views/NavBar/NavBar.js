import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";

function NavBar() {
    return (
        <>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to="/">글목록</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/article/create">글쓰기</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/profile">프로필</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/signup">회원가입</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/signin">로그인</Link>
                </Menu.Item>
            </Menu>
        </>
    );
}

export default NavBar;
