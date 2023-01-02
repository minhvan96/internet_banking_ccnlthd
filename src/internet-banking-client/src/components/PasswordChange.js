import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PasswordChange() {
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
                            <p>Enter new password</p>
                            <div className="txt_field">
                                <input type="password" required 
                                id="passwordNew"
                                className="h-full w-full border-0 outline-none"
                                name="passwordNew"
                                onChange={(e) => setPassword(e.currentTarget.value)}/>
                                <span></span>
                                <label>Password New</label>
                            </div>
                            <div className="txt_field">
                                <input type="password" required 
                                id="passwordConfirm"
                                className="h-full w-full border-0 outline-none"
                                name="passwordConfirm"
                                onChange={(e) => setPassword(e.currentTarget.value)}/>
                                <span></span>
                                <label>Confirm password</label>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="login__footer"></div>
            </div>
        </div>
    );
}

export default PasswordChange;