import { useEffect, useContext, useState } from "react";
import "../pages/addPost/addPost.css";
import axios from "axios";
import { Context } from "../context/Context";
import { useLocation } from "react-router";
import Swal from 'sweetalert2';

export default function EditPost() {

  const { user } = useContext(Context);
  const [fieldsError, setfieldsError] = useState("");
  const [post, setPost] = useState({});
  const location = useLocation();
  const path = location.state.value;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [include, setInclude] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.replace("/")
    };

    const fileInput = document.querySelector('#myFile');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
        const imageUrl = await axios.post('http://localhost:3001/api/users/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        const newPost = {
          username: user.username,
          title,
          desc,
          image: imageUrl.data,
          include,
          steps,
        };

    try {
      if (title || desc || image || include || steps) {
        const res = await axios.patch("http://localhost:3001/api/users/"
          + path, newPost);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'edit successfully',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {  window.location.replace("/post/" + res.data._id); }, 1600);
      } else {
        setfieldsError("*Please fill all required fields*");
      }
    } catch (err) {
      console.log(err)
    }
  }

  const errorAppears = (fieldsError) => {
    if (fieldsError !== "") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    } else {
      return false;
    }
  }

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

  useEffect(() => {
    setTitle(post.title);
    setDesc(post.desc);
    setInclude(post.include);
    setSteps(post.steps);
  }, [post]);

  return (
    <div className="addPost">
      <h1 className="addPostTitle">Edit recipe</h1>
      <form className="writeForm" onSubmit={handleSubmit}>
        {errorAppears(fieldsError) && <span className="fieldsEror">{fieldsError}</span>}
        <div className="writeFormFirst">
          <input
            type="text"
            value={title}
            className="writeFirst"
            onChange={e => setTitle(e.target.value)}
            disabled={false}
            readOnly={false}
          ></input>
        </div>
        <div className="writeFormFirst">
          <input
            type="text"
            value={desc}
            className="writeFirst"
            onChange={e => setDesc(e.target.value)}
          ></input>
        </div>
        <div className="writeFormFirst">
          <input type="file" id="myFile" className="writeFirst" onChange={e => setImage(e.target.value)}>
          </input>
        </div>
        <div className="writeFormSec">
          <textarea
            value={include}
            className="writeSec"
            onChange={e => setInclude(e.target.value)}
          ></textarea>
          <textarea
            value={steps}
            className="writeSec"
            onChange={e => setSteps(e.target.value)}
          >
          </textarea>
        </div>
        <button className="addPostButton" type="submit">Send</button>
      </form>
    </div>
  );
}
