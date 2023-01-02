import React, { useState } from "react";
import "../assets/css/login.scss";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Background from "../assets/images/bg-login.jpg";
import { ToastContainer } from "react-toastify";
import LoadingImages from "../assets/images/loading_new.gif";
import {
    EyeOutlined,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
    const { signIn, loading } = useAuth();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [recaptcha, setRecaptcha] = useState(false);
    const [inputError, setInputError] = useState({
        username: false,
        password: false,
    });
    const [typePassword, setTypePassword] = useState("password");
    const [iconPassword, setIconPassword] = useState("hide");
    const onChangeRecaptcha = async (e) => {
        setRecaptcha(true);
    }

    const handleToggle = () => {
        if (typePassword === "password") {
            setIconPassword("show");
            setTypePassword("text");
        } else {
            setIconPassword("hide");
            setTypePassword("password");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (recaptcha) {
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
        <div
            className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12"
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover",
            }}
        >
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="relative py-3 sm:mx-auto" style={{ minWidth: "30vw" }}>
                <div
                    className="relative min-w-full px-4 py-10 bg-white bg-opacity-50 border border-gray-200 shadow-lg sm:rounded-xl sm:p-10 bg-clip-padding"
                    style={{ backdropFilter: "blur(10px)" }}
                >
                    <div className="max-w-full mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="w-full md:w-login">
                                <form onSubmit={handleSubmit} className="px-10 pt-4 pb-4 mb-4">
                                    <p className="my-5 text-3xl font-bold">
                                        Sign in to your account
                                    </p>
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="username"
                                        >
                                            User name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="username"
                                            type="text"
                                            placeholder="User name"
                                            value={username}
                                            style={{ textTransform: "lowercase" }}
                                            onChange={(e) => setUserName(e.currentTarget.value.trimStart())}
                                            onKeyDown={(e) => onHandleKeydown(e)}
                                        />
                                        {inputError.username && (
                                            <p className="text-xs italic text-red-500">
                                                Please input a valid username
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <div className="flex items-center w-full px-3 py-2 bg-white leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
                                            <input
                                                type={typePassword}
                                                id="password"
                                                placeholder="Password"
                                                className="h-full w-full border-0 outline-none"
                                                name="password"
                                                onChange={(e) => setPassword(e.currentTarget.value)}
                                            />
                                            <span onClick={handleToggle} className="cursor-pointer">
                                                {iconPassword === "hide" ? (
                                                    <EyeOutlined style={{ fontSize: 20 }} />
                                                ) : (
                                                    <EyeInvisibleOutlined style={{ fontSize: 20 }} />
                                                )}
                                            </span>
                                        </div>
                                        {inputError.email && (
                                            <p className="text-xs italic text-red-500">
                                                Please input a valid password
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        <ReCAPTCHA
                                            sitekey="6LdJK3kjAAAAAGxWuz0ijXy9NX4V21VIgl9v2Ptv"
                                            onChange={onChangeRecaptcha}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            Sign In
                                        </button>
                                        {loading && (
                                            <img
                                                src={LoadingImages}
                                                className="w-12 h-12"
                                                alt="Loading"
                                            />
                                        )}

                                        <Link
                                            className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
                                            to="/password-reset"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;