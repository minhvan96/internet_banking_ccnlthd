import React, { useState } from "react";
import "../assets/css/login.scss";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
    const { signIn, loading } = useAuth();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [recaptcha, setRecaptcha] = useState(false);

    const onChangeRecaptcha = async (e) => {
        setRecaptcha(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(recaptcha) {
            console.log("🚀 ~ file: Login.js:21 ~ handleSubmit ~ recaptcha", recaptcha)
            signIn(username.trim(), password.trim());
        }
        setRecaptcha(false);
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
                            <div className="txt_field">
                                <input required
                                    id="username"
                                    type="text"
                                    value={username}
                                    style={{ textTransform: "lowercase" }}
                                    onChange={(e) => setUserName(e.currentTarget.value.trimStart())}
                                    onKeyDown={(e) => onHandleKeydown(e)}/>
                                <span></span>
                                <label>Username</label>
                            </div>
                            <div className="txt_field">
                                <input type="password" required 
                                id="password"
                                className="h-full w-full border-0 outline-none"
                                name="password"
                                onChange={(e) => setPassword(e.currentTarget.value)}/>
                                <span></span>
                                <label>Password</label>
                            </div>
                            <ReCAPTCHA
                                sitekey="6LdJK3kjAAAAAGxWuz0ijXy9NX4V21VIgl9v2Ptv"
                                onChange={onChangeRecaptcha}
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    <div className="login__form-forget">
                        <Link to="/password-reset">Quên mật khẩu?</Link>
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