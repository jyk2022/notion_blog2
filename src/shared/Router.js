import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "../pages/Blog"; // Blog 페이지 컴포넌트 경로
import Detail from "../pages/Detail"; // Detail 페이지 컴포넌트 경로

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Blog />} />
                <Route path="/detail/:pageId" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
