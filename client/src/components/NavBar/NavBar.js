import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

function NavBar() {
    const curPage = reloadSetCurPage();

    function reloadSetCurPage() {
        const path = window.location.pathname;
        if (path === "/") return "1";
        else if (path === "/article/create/") return "2";
        else if (path === "/profile") return "3";
        else if (path === "/signup") return "4";
        else if (path === "/signin") return "5";
    }

    return (
        <>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={curPage}>
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
