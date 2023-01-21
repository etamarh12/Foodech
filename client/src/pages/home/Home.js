import "./home.css";
import "../../Post/post.css";
import Post from "../../Post/post"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/post")
        if (res.data) {
          setPosts(res.data)
        }

      } catch (err) {
        console.log(err);
      }
    }
    fetchPost()
  }, [])


  const filteredrecipes = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === '' || post.category === categoryFilter)
  );

  const handleCategoryChange = e => {
    setCategoryFilter(e.target.value);
  };

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
          <select className='category-filter' onChange={handleCategoryChange}>
            <option value=''></option>
            <option value='Breakfast'>Breakfast</option>
            <option value='Lunch'>Lunch</option>
            <option value='Appetizer'>Appetizer</option>
            <option value='Salad'>Salad</option>
            <option value='Main-course'>Main-course</option>
            <option value='Side-dish'>Side-dish</option>
            <option value='Baked-goods'>Baked-goods</option>
            <option value='Dessert'>Dessert</option>
          </select>
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