import React, { useState } from "react";
import { Button, Input } from "antd";
import "../assets/css/login.scss";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
    const { signIn, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(email.trim(), password.trim());
    };
    const onHandleKeydown = (e) => {
        if (e.which === 32 && e.target.selectionStart === 0) {
            return false;
        }
    };
    return (
        <div className="login-page">
            <div className="login__container">
                <div className="login__form">
                    <div className="login__form-header">
                        <h1 className="header__title title-primary">NPTV</h1>
                        <h1 className="header__title title-second">Digibank</h1>
                    </div>
                    <p className="login__form-wellcome">Kính chào Quý khách</p>
                    <div className="center">
                        <form onSubmit={handleSubmit}>
                            <div class="txt_field">
                                <input required
                                    id="username"
                                    type="text"
                                    value={email}
                                    style={{ textTransform: "lowercase" }}
                                    onChange={(e) => setEmail(e.currentTarget.value.trimStart())}
                                    onKeyDown={(e) => onHandleKeydown(e)}/>
                                <span></span>
                                <label>Username</label>
                            </div>
                            <div class="txt_field">
                                <input type="password" required 
                                id="password"
                                className="h-full w-full border-0 outline-none"
                                name="password"
                                onChange={(e) => setPassword(e.currentTarget.value)}/>
                                <span></span>
                                <label>Password</label>
                            </div>
                            <input type="submit" value="Login" />
                        </form>
                    </div>
                    <div className="login__form-forget">
                        <Link to="/password_reset">Quên mật khẩu?</Link>
                        <Link>Hướng dẫn chuyển đổi sang VCB Digibank</Link>
                        <Link>Đặt lịch hẹn với Vietcombank</Link>
                    </div>
                </div>
                <div className="login__footer"></div>
            </div>
        </div>
    );
}

export default Login;