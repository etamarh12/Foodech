import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    if (userRef.current.value === "" || passwordRef.current.value === "") {
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Please fill all required fields");
    } else {
      try {
        const res = await axios.post("http://localhost:3001/api/auth/login", {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(err.response.data.error);
      }
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
      {error && <span className="spanErorLogin">{error}</span>}
        <label className="lable">Username :</label>
        <input type="text" className="loginInput" placeholder="Enter your Username ..."
          ref={userRef} />
        <label className="lable">Password :</label>
        <input type="password" className="loginInput" placeholder="Enter your password ..."
          ref={passwordRef} />
        <button className="loginButton" disabled={isFetching}>Login</button>
      </form>
    </div>
  )
}
