import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router"
import "./singlepost.css"
import { Context } from "../context/Context";
import { useNavigate } from 'react-router-dom';


export default function SinglePost() {
    const location = useLocation();
    const { user } = useContext(Context);
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/post/" + path);
                setPost(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getPost();
    }, [path]);

    if(!post) {
        return null;
    }


    const isExist = () => {
        if (user != null && post != null) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <div className="singlepost">
            <div className="singlePostWrapper">
                <img
                className="postImg"
                src={post.image ? `http://localhost:3001/images/${post.image}` : `https://via.placeholder.com/350?text=${post.title.replace(' ', '+')}`}
                alt=""
              />
                <h1 className="singlePostTitle">
                    {post.title}
                </h1>
                <h5 className="by">
                    Written by : <b>{post.username}</b>
                </h5>
                <div>{isExist() && post.username === user.username && <button className="editBtn" onClick={() => navigate('/editPost',{ state :{value : path} })}>Edit</button>}</div>
                <div className="singlePostInfo">
                    <span className="ingredients">
                        <h1 className="ingredient">Ingredient :</h1>
                        <p>
                            {post.include}
                        </p>
                    </span>
                    <span className="steps">
                        <h1 className="step">Steps :</h1>
                        <p>
                            {post.steps}
                        </p>
                    </span>
                </div>
            </div>
        </div>
    )
}
