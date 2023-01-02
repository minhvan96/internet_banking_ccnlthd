import React, { useState } from "react";

const CreateDebtReminder = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState({
        email: false,
        password: false,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    };
    return (
        <div
            className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12"

        >
            <div className="relative py-3 sm:mx-auto" style={{ minWidth: "30vw" }}>
                <div
                    className="relative min-w-full px-4 py-10 bg-white bg-opacity-50 border border-gray-200 shadow-lg sm:rounded-xl sm:p-10 bg-clip-padding"
                    style={{ backdropFilter: "blur(10px)" }}
                >
                    <div className="max-w-full mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="w-full">
                                <form onSubmit={handleSubmit} className="px-10 pt-4 pb-4 mb-4">
                                    <p className="my-5 text-3xl font-bold">Khởi tạo nhắc nợ</p>
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="username"
                                        >
                                            Thông tin tài khoản nhắc nợ(điền số tài khoản)
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="sotaikhoan"
                                            type="text"
                                            placeholder="Số tài khoản"
                                            value={email}
                                            onChange={(e) => setEmail(e.currentTarget.value)}
                                        />
                                        {inputError.email && (
                                            <p className="text-xs italic text-red-500">
                                                Please input a valid username
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="number"
                                        >
                                            Số tiền chuyển
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="sotienchuyen"
                                            type="text"
                                            placeholder="Số tiền chuyển"
                                            value={email}
                                            onChange={(e) => setEmail(e.currentTarget.value)}
                                        />
                                        {inputError.email && (
                                            <p className="text-xs italic text-red-500">
                                                Please input a valid username
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="username"
                                        >
                                            Nội dung
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="noidung"
                                            type="text"
                                            placeholder="Nội dung chuyển tiền"
                                            value={email}
                                            onChange={(e) => setEmail(e.currentTarget.value)}
                                        />
                                        {inputError.email && (
                                            <p className="text-xs italic text-red-500">
                                                Please input a valid username
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Hoàn thành
                                        </button>
                                        <a
                                            className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
                                            href="/"
                                        >
                                            Trở về
                                        </a>
                                    </div>
                                </form>
                                <p className="text-xs text-center text-gray-500">
                                    &copy;2022 Axpara. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDebtReminder;