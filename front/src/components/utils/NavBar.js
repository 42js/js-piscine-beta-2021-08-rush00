import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const { Sider } = Layout;
const { SubMenu } = Menu;

function NavBar({history}) {

    const onLogoutHandler = (e) => {
        console.log("logout click");

        axios
        .get("http://localhost:4242/account/signout")
        .then((response) => {
            console.log("SUCCESS : sign out");
            history.push("/");
        })
        .catch((error) => {
            alert("error");
            console.log(error);
        })

    }

    return (
        <nav>
            <Sider style={{height: '100%'}}>
                <div className="App-logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1">
                        <span>내 프로필</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <span>게시글</span>
                            </span>
                        }
                    >
                        <Menu.Item key="2">전체 게시글</Menu.Item>
                        <Menu.Item key="3">내가 쓴 게시글</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4">
                        <span onClick={onLogoutHandler}>로그아웃</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        </nav>
    );
}

export default NavBar;
