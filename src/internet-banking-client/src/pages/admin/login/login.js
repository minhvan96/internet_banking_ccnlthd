import React from "react";
import "./login.scss"
import {Button, Form, Input} from "antd";
import useAuth from "../../../hooks/useAuth";


function AdminLogin() {
    const { signIn } = useAuth();
    const onFinish = (values) => {
        signIn(values.username.trim(), values.password.trim());
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="body">
        <div className="signin">
            <div className="back-img">
                <div className="sign-in-text">
                    <h2 className="active">Sign In</h2>
                </div>
                <div className="layer">
                </div>
                <p className="point">&#9650;</p>
            </div>
            <div className="form-section">

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className="sign-in-btn" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </div>
    );
}
export default AdminLogin;