import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import "./TopBar.css"


export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };

  return (
    <div className="top">
      <div className='topLeft'>{user && "hi, " + (user.username)}</div>
      <div className='topCenter'>
        <ul className="topList">
          <li className='topListItem'>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          </li>
          {user && (
            <li className='topListItem'>
              <Link to="/addpost" style={{ color: "inherit", textDecoration: "none" }}>Add recipe</Link>
            </li>)
          }
          {!user && (
            <li className='topListItem'>
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>Login</Link>
            </li>)
          }
          {!user && (
            <li className='topListItem'>
              <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>Register</Link>
            </li>)
          }
          {user && (
            <li className='topListItem' onClick={handleLogout}>Logout</li>
          )
          }
        </ul>
      </div>
    </div>
  )
}
