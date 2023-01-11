import "./home.css";
import "../../Post/post.css";
import Post from "../../Post/post"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/post")
        if(res.data){
          setPosts(res.data)
      }

      } catch (err) {
        console.log(err);
      }
    }
    fetchPost()
  }, [])

  const filteredrecipes = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = e => {
    setSearch(e.target.value);
  };
  
  return (
    <div className="home">
      <div>
        <form className="search-box">
          <input
            className='search-input'
            type='text'
            onChange={handleChange}
            placeholder='Search recipe'
          />
        </form>
        <div className='posts'>
          {filteredrecipes.map(post => {
            return (
              <Post key={post._id} post={post} />
            );
          })}
        </div>
      </div>
    </div>
  );
}