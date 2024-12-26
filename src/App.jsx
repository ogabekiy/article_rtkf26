import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
    ArticleDetails,
    CreateArticle,
    Search,
    Home,
    Login,
    Navbar,
    SignUp,
    UpdateArticle,
    ArticlesPage,
    Profile,
} from "./components";
import { useGetUserQuery } from "./service/api";
import { setIsAuthenticated, setUser } from "./slices/authSlice";

const App = () => {
    const dispatch = useDispatch();
    const { data: user, isLoading, isError } = useGetUserQuery();

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
            dispatch(setIsAuthenticated(true));
        } else if (isError) {
            localStorage.removeItem("token");
        }
    }, [user, isError, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dark:bg-black max-lg:pb-20 min-h-screen dark:text-white">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/articles/:id" element={<ArticleDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/create-article" element={<CreateArticle />} />
                <Route path="/update-article/:id" element={<UpdateArticle />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
};

export default App;
