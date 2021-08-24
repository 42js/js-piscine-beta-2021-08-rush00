import React, { useState } from "react";
import axios from "axios";
import SigninPagePresenter from "./SigninPagePresenter";
function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFinish = (body) => {
        console.log(body);
        axios
            .post("/users/login", body)
            .then((res) => {
                console.log(res.message);
                if (res.status === 200) {
                    const { token } = res.data;
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;
                    alert(" 완료되었습니다");
                    window.location.replace("/");
                } else {
                    alert("로그인 실패");
                }
            })
            .catch((e) => {
                console.log("error");
                console.error(e);
            });
    };
    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
    };
    const onClickSignup = () => {
        window.location.replace("/signup");
    };
    return (
        <div>
            <SigninPagePresenter
                email={email}
                password={password}
                onFinish={onFinish}
                onEmailHandler={onEmailHandler}
                onPasswordHandler={onPasswordHandler}
                onClickSignup={onClickSignup}
            />
        </div>
    );
}

export default SigninPage;
