//import React, { useEffect } from "react";
//import axisos from "axios";
import { Form, Card, Button, Input } from "antd";

function SignupPagePresenter({
    name,
    email,
    password,
    onFinish,
    onNameHandler,
    onEmailHandler,
    onPasswordHandler,
    onClickSignin,
}) {
    return (
        <div>
            <Card
                title="회원가입"
                style={{ width: "70%", margin: "100px auto" }}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        //label="name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "이름을 입력해주세요",
                            },
                        ]}
                    >
                        <Input
                            value={name}
                            placeholder="Name"
                            onChange={onNameHandler}
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
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
                        name="password"
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
                        onClick={onClickSignin}
                        type="text"
                        style={{ marginLeft: "20px" }}
                    >
                        이미 회원이신가요?
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default SignupPagePresenter;
