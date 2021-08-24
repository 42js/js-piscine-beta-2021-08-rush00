import SignupPagePresenter from "./SignupPagePresenter";
import axios from "axios";
import React, { useState } from "react";

export default function SignupPageContainer() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onFinish = (body) => {
        console.log(body);
        axios
            .post("localhost:5000/users/signup", body)
            .then((res) => {
                console.log(res.message);
                if (res.status === 200) {
                    alert("회원가입이 완료되었습니다");
                    window.location.replace("/signin");
                } else {
                    alert("회원가입 실패");
                    window.location.reload();
                }
            })
            .catch((e) => {
                console.log("error");
                console.error(e);
            });
    };
    const onClickSignin = () => {
        window.location.replace("/signin");
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

    return (
        <>
            <SignupPagePresenter
                name={name}
                email={email}
                password={password}
                onFinish={onFinish}
                onNameHandler={onNameHandler}
                onEmailHandler={onEmailHandler}
                onPasswordHandler={onPasswordHandler}
                onClickSignin={onClickSignin}
            />
        </>
    );
}
