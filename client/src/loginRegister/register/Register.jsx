import axios from "axios"
import { useState } from "react"
import "./register.css"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("");

  const hamdleSubmit = async (e) => {
    setError(false);
    try {
      if (email.length < 5 || password.length < 4 || username < 4) {
        setError(true);
        alert("Some field still empty or this username/email may exists");
      } else {
        setError(false);
        e.preventDefault();
        const res = await axios.post("http://localhost:3001/api/auth/register", {
          username,
          password,
          email
        });
        res.data && window.location.replace("/login")
      }
    } catch (err) {
      setError(true);
    }
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={hamdleSubmit}>
        <label className="lable">Username :</label>
        <input type="text"
          className="registerInput"
          placeholder="Enter your Username ..."
          onChange={e => setUsername(e.target.value)}
        />
        <label className="lable">Email :</label>
        <input type="text" className="registerInput" placeholder="Enter your email ..."
          onChange={e => setEmail(e.target.value)} />
        <label className="lable">Password :</label>
        <input type="password" className="registerInput" placeholder="Enter your password ..."
          onChange={e => setPassword(e.target.value)} />
        <button className="registerButton" type="submit" >Register</button>
        {error && <span>Please fill all required fields !</span>}
      </form>
    </div>
  )
}
