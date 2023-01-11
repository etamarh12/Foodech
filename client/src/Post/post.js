import { Link } from "react-router-dom"
import "./post.css"

export default function post({ post }) {

  return (
    <div className="post">
      <Link to={`/post/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
        <img
          className="postImg"
          src={post.image ? `http://localhost:3001/images/${post.image}` : `https://via.placeholder.com/350?text=${post.title.replace(' ', '+')}`}
          alt=""
        />
        <div className="postInfo">
          <div className="postName">{post.title}</div>
          <div className="postDes">{post.desc}</div>
        </div>
      </Link>
    </div>
  )
}
