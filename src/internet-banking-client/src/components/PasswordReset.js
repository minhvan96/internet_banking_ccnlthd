import React, { useState } from "react";
import "../assets/css/login.scss";
import { Link } from "react-router-dom";

function PasswordReset() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <p className="login__form-wellcome">Reset Your Password</p>
                    <p className="login__form-wellcome">Forgot your password? Please enter your email address.
                        You will receive a new password via
                        email</p>
                    <div className="center">
                        <form onSubmit={handleSubmit}>
                            <div className="txt_field">
                                <input required
                                    id="username"
                                    type="text"
                                    value={email}
                                    style={{ textTransform: "lowercase" }}
                                    onChange={(e) => setEmail(e.currentTarget.value.trimStart())}
                                    onKeyDown={(e) => onHandleKeydown(e)} />
                                <span></span>
                                <label>Email</label>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="login__form-forget">
                        <Link to="/login">Go to login?</Link>
                    </div>
                </div>
                <div className="login__footer"></div>
            </div>
        </div>
    );
}

export default PasswordReset;