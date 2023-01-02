import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { ToastContainer } from "react-toastify";
import Background from "../assets/images/bg-login.jpg";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function PasswordReset() {

    const [isEmail, setIsEmail] = useState(false);

    const initialValues = {
        email: "",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.preventDefault();
        setIsEmail(true);
    };
    const onHandleKeydown = (e) => {
        if (e.which === 32 && e.target.selectionStart === 0) {
            return false;
        }
    };

    const validationSchema = yup.object({
        email: yup.string()
            .email("Invalid Email")
            .required("Email can not be blank"),
    });

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
                    className="relative max-w-full px-4 py-10 bg-white bg-opacity-50 border border-gray-200 shadow-lg sm:rounded-xl sm:p-10 bg-clip-padding"
                    style={{ backdropFilter: "blur(10px)" }}
                >
                    <div className="min-w-full mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="w-full md:w-login">
                                {!isEmail ? (
                                    <div className="px-10 pt-4 pb-4 mb-4">
                                        <p className="my-5 mb-2 text-3xl font-bold">
                                            Reset Your Password
                                        </p>
                                        <div className="mb-4">
                                            <label className="block mb-4 text-sm font-medium text-gray-700">
                                                Forgot your password? Please enter your email address.
                                                You will receive a link to create a new password via
                                                email
                                            </label>
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit}
                                            >
                                                {(formik) => {
                                                    return (
                                                        <Form>
                                                            <label
                                                                className="block mb-2 text-sm font-bold text-gray-700"
                                                                htmlFor="username"
                                                            >
                                                                Email <span className="text-red-500">*</span>
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                id="email"
                                                                placeholder="Enter your email address"
                                                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                                name="email"
                                                            />
                                                            <ErrorMessage name="email">
                                                                {(errMsg) => (
                                                                    <div className="text-red-500 mt-1 flex items-center">
                                                                        <ExclamationCircleOutlined />
                                                                        <span className="ml-1">{errMsg}</span>
                                                                    </div>
                                                                )}
                                                            </ErrorMessage>
                                                            <div className="flex items-center justify-between mt-4">
                                                                <button
                                                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                                    type="submit"
                                                                >
                                                                    RESET PASSWORD
                                                                </button>
                                                            </div>
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        </div>
                                        <button
                                            className="w-full px-4 py-2 font-bold  bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            <Link
                                                className=" text-white hover:text-white"
                                                to="/login"
                                            >
                                                RETURN TO LOG-IN
                                            </Link>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="px-10 pt-4 pb-4 mb-4">
                                        <p className="my-5 mb-4 text-3xl font-bold">
                                            Password Reset Request Sent
                                        </p>
                                        <label className="block mb-4 text-sm font-medium text-gray-700">
                                            A password reset message was sent to your email address if
                                            it is registered. Please click the link in that message to
                                            reset your password.
                                        </label>
                                        <label className="block mb-8 text-sm font-medium text-gray-700">
                                            If you do not receive the password reset message within a
                                            few moments, please check your spam folder or other
                                            filtering tools.
                                        </label>
                                        <button
                                            className="w-full px-4 py-2 font-bold  bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            <Link
                                                className=" text-white hover:text-white"
                                                to="/login"
                                            >
                                                RETURN TO LOG-IN
                                            </Link>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;