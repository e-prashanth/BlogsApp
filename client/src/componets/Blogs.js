import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Navigate, useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [allRatings, setAllRatings] = useState([]);

  const handleStarClick = (rating) => {
    setUserRating(rating);
    setAllRatings([...allRatings, rating]);
  };

  const calculateAverageRating = () => {
    if (allRatings.length === 0) {
      return 0;
    }
    const totalRating = allRatings.reduce((sum, rating) => sum + rating, 0);
    return totalRating / allRatings.length;
  };
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blogs")
      .catch((err) => console.log(err)); 
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
          
        ))}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <button onClick={(event)=>{navigate('/blogs/add')}} style={{backgroundColor:"black",color:"white",borderRadius:"10px",padding:'5px',marginTop:'20px',marginBottom:'20px'}}>Add post</button>
        </div>
        
    </div>
  );
};

export default Blogs;