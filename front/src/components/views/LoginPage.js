import axios from "axios";
import React, { useState } from "react";

export default function LoginPage({history}) {
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const onIdHandler = (e) => {
        setId(e.target.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const onSignInHandler = (e) => {
        e.preventDefault(); // for no refresh

        console.log("Id", Id);
        console.log("Password", Password);

        let body = {
            id: Id,
            password: Password,
        };

        axios.post("http://localhost:4242/account/signin", body)
        .then(response => {
            console.log("SUCCESS : sign in")
            console.log(response.data);
            history.push("/main");      // "url/main"으로 이동
            return response.data;})
        .catch(error => {
            alert("SIGN IN : Wrong id or password")
            console.log("FAIL : sign in")
            console.log(error);
            history.push("/");
        });
    };
    
    const onSignUpHandler = (e) => {
        e.preventDefault(); // for no refresh

        console.log("Id", Id);
        console.log("Password", Password);

        let body = {
            id: Id,
            password: Password,
        };

        axios.post("http://localhost:4242/account/signup", body)
        .then(response => {
            alert("SIGN IN : Success! Let's log-in")
            console.log("SUCCESS : sign up")
            console.log(response.data);
            history.push("/");
            return response.data;})
        .catch(error => {
            alert("SIGN UP : Wrong id or password")
            console.log("FAIL : sign up")
            console.log(error);
            history.push("/");
        });
    };


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <form
                style={{ display: "flex", flexDirection: "column" }}
            >
                <h1>LOGIN</h1>
                <label>ID</label>
                <input type="id" value={Id} onChange={onIdHandler} />

                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                />
                <br />
                <button onClick={onSignInHandler}>Sign in</button>
                <button onClick={onSignUpHandler}>Sign up</button>
            </form>
        </div>
    );
}