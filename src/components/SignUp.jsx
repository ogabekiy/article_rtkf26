import React, { useEffect, useState } from "react";
import { useSignupMutation } from "../service/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser } from "../slices/authSlice";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signup] = useSignupMutation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const formSubmit = async (e) => {
        e.preventDefault();
        const body = {};
        const formData = new FormData(e.target);
        formData.forEach((val, key) => {
            body[key] = val;
        });
        setLoading(true);
        try {
            const res = await signup(body).unwrap();
            dispatch(setUser(res.user));
            dispatch(setIsAuthenticated(true));
            localStorage.setItem("token", res.token);
            setError(false);
            navigate("/");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-100px)] justify-center flex items-center">
            <form
                onSubmit={formSubmit}
                className="w-[400px] shadow px-5 py-10 rounded"
            >
                <h3 className="font-bold text-3xl text-center mb-5">
                    Register
                </h3>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        name="email"
                        type="text"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="example@email.com"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your username
                    </label>
                    <input
                        name="username"
                        type="text"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        name="password"
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                {error && (
                    <div className="text-red-500 text-center mb-5">
                        Registration failed. Please try again.
                    </div>
                )}
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
