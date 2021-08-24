import React, { useState } from "react";
import axios from "axios";
import SigninPagePresenter from "./SigninPagePresenter";
function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFinish = (body) => {
        console.log(body);
        axios
            .post("localhost:5000/users/signin", body)
            .then((res) => {
                console.log(res.message);
                if (res.status === 200) {
                    alert(" 완료되었습니다");
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
