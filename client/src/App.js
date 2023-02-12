import AddPost from "./pages/addPost/AddPost";
import Login from "./loginRegister/login/Login";
import Register from "./loginRegister/register/Register";
import TopBar from "./topbar/TopBar";
import Single from "./pages/home/single/Single";
import EditPost from "./SinglePost/EditPost";
import Home from "./pages/home/Home";
import React, { useContext } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/editPost" element={user ? <EditPost /> : <Login />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/addpost" element={user ? <AddPost /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
