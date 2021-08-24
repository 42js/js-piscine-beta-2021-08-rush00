//import React, { useEffect } from "react";
//import axisos from "axios";
import { Form, Card, Button, Input } from "antd";

function SigninPagePresenter({
    email,
    password,
    onFinish,
    onEmailHandler,
    onPasswordHandler,
    onClickSignup,
}) {
    return (
        <div>
            <Card title="로그인" style={{ width: "70%", margin: "100px auto" }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="Email"
                        //label="Email"
                        rules={[
                            {
                                required: true,
                                message: "이메일을 입력해주세요",
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            placeholder="Email"
                            onChange={onEmailHandler}
                            value={email}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        //label="Password"
                        rules={[
                            {
                                required: true,
                                message: "비밀번호를 입력해주세요",
                            },
                        ]}
                    >
                        <Input.Password
                            required
                            placeholder="password"
                            onChange={onPasswordHandler}
                            value={password}
                        />
                    </Form.Item>

                    <Button htmlType="submit" type="primary">
                        가입하기
                    </Button>
                    <Button
                        onClick={onClickSignup}
                        type="text"
                        style={{ marginLeft: "20px" }}
                    >
                        회원가입
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default SigninPagePresenter;
