import { useContext, useState } from "react";
import "./addPost.css";
import axios from "axios";
import { Context } from "../../context/Context";
import Swal from 'sweetalert2';
import { FILTER_CATEGORIES } from "./consts";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [include, setInclude] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useContext(Context);
  const [fieldsError, setfieldsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.replace("/")
    };
    const fileInput = document.querySelector('#myFile');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      if (title || desc || image || include || steps) {
        const imageUrl = await axios.post('http://localhost:3001/api/users/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        const newPost = {
          username: user.username,
          title,
          desc,
          image: imageUrl.data,
          include,
          steps,
          category,
        };
        const res = await axios.post("http://localhost:3001/api/post", newPost);
        console.log(newPost);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Post successfully',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => { window.location.replace("/post/" + res.data._id); }, 1600);
      } else {
        setfieldsError("*Please fill all required fields*");
      }
    } catch (err) {
      console.log(err)
    }
  };

  const errorAppears = (fieldsError) => {
    if (fieldsError !== "") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="addPost">
      <h1 className="addPostTitle">Add recipe</h1>
      <form className="writeForm" onSubmit={handleSubmit} encType="multipart/form-data">
        {errorAppears(fieldsError) && <span className="fieldsEror">{fieldsError}</span>}
        <div className="writeFormFirst">
          <input
            type="text"
            placeholder="Recipe Name"
            className="writeFirst"
            onChange={e => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="writeFormFirst">
          <input
            type="text"
            placeholder="Recipe Description"
            className="writeFirst"
            onChange={e => setDesc(e.target.value)}
          ></input>
        </div>
        <div className="writeFormFirst">
          <input type="file" id="myFile" className="writeFirst" onChange={e => setImage(e.target.value)}>
          </input>
        </div>
        <h3 className="catagoriesTitle">Choose a recepie catagory :</h3>
        <div className="Categories" onChange={e => setCategory(e.target.value)}>
          {FILTER_CATEGORIES.map(category => (
            <>
              <input type="radio" id={category} name="category" value={category} />
              <label for={category}>{category}</label>
            </>
          ))}
        </div>
        <div className="writeFormSec">
          <textarea
            placeholder="Ingredient"
            className="writeSec"
            onChange={e => setInclude(e.target.value)}
          ></textarea>
          <textarea
            placeholder="Steps"
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
