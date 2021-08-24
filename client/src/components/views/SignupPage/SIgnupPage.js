//import React, { useEffect } from "react";
//import axisos from "axios";
import { Row, Button, Input, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";

const { Title } = Typography;

function SIgnupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        const body = { name, email, password };
        console.log(body);
        axios.post("localhost:5000/users/signup", body).then((res) => {
            console.log(res.message);
        });
    };
    const onNameHandler = (e) => {
        setName(e.target.value);
    };
    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const titleStyle = { marginTop: "50px", marginBottom: "30px" };
    return (
        <>
            <Row
                justify="center"
                style={{
                    padding: "100px",
                }}
            >
                <Title style={titleStyle}>회원가입</Title>
                <form onSubmit={onSubmit}>
                    <Input
                        placeholder="name"
                        style={{
                            marginBottom: "10px",
                        }}
                        value={name}
                        onChange={onNameHandler}
                    />
                    <Input
                        type="email"
                        placeholder="email"
                        style={{
                            marginBottom: "10px",
                        }}
                        onChange={onEmailHandler}
                        value={email}
                    />
                    <Input.Password
                        placeholder="password"
                        style={{
                            marginBottom: "10px",
                        }}
                        onChange={onPasswordHandler}
                        value={password}
                    />
                    {/*<Input.Password
                        placeholder="password check"
                        style={{
                            marginBottom: "30px",
                        }}
                    />*/}
                    <Button
                        type="primary"
                        style={{
                            width: "100%",
                        }}
                        onClick={onSubmit}
                    >
                        회원가입
                    </Button>
                </form>
            </Row>
        </>
    );
}

export default SIgnupPage;
