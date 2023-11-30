import React, { useState, useEffect } from "react";
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import { useStyles } from "./utils";

const Blogs = ({ title, desc, img, user, isUser, id }) => {
  const [userRating, setUserRating] = useState(0);
  const [allRatings, setAllRatings] = useState([]);
  const [overallRating, setOverallRating] = useState(0);

  const handleStarClick = (rating) => {
    setUserRating(rating);
    setAllRatings([...allRatings, rating]);

    // Store blog id and ratings in local storage
    localStorage.setItem("blogRatings", JSON.stringify({ ...JSON.parse(localStorage.getItem("blogRatings")), [id]: [...allRatings, rating] }));
  };

  const calculateAverageRating = () => {
    if (allRatings.length === 0) {
      return 0;
    }
    const totalRating = allRatings.reduce((sum, rating) => sum + rating, 0);
    return totalRating / allRatings.length;
  };

  const classes = useStyles();
  const navigate = useNavigate();
  const { isSpeaking, utterance, speak } = useSpeechSynthesis();

  useEffect(() => {
    // Retrieve ratings for the current blog from local storage
    const storedRatings = JSON.parse(localStorage.getItem("blogRatings")) || {};
    setAllRatings(storedRatings[id] || []);

    if (utterance) {
      utterance.onend = () => {
        // Update speaking state when speech ends
        speak(null);
      };
    }
  }, [id, utterance, speak]);
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest();
    window.location.reload();
  };
  const handleSpeak = () => {
    if (isSpeaking) {
      // Stop speaking if currently speaking
      speak(null);
    } else if (desc.trim() !== "") {
      // Start speaking if not currently speaking
      const newUtterance = new SpeechSynthesisUtterance(desc);
      speak(newUtterance);
    }
  };

  return (
    <div>
      <Card sx={{ width: "40%", margin: "auto", mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover": { boxShadow: "10px 10px 20px #ccc", } }}>
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={<Avatar className={classes.font} sx={{ bgcolor: "red" }} aria-label="recipe">{user ? user.charAt(0) : ""}</Avatar>}
          title={title}
        />
        <CardMedia component="img" height="194" image={img} alt="Paella dish" />
        <CardContent>
          <hr />
          <br />
          <Typography className={classes.font} variant="body2" color="text.secondary">
            <b>{user}</b> {": "} {desc}
          </Typography>
        </CardContent>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={handleDelete} style={{ backgroundColor: "black", color: "white", borderRadius: "10px", padding: "5px", marginTop: "20px", marginBottom: "20px" }}>delete</button>
          <button onClick={handleSpeak} style={{ backgroundColor: "black", color: "white", borderRadius: "10px", padding: "5px", marginTop: "20px", marginBottom: "20px", marginLeft: "20px" }}>{isSpeaking ? "Stop" : "Speak"}</button>{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2>Rate this</h2>
          <div>
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                onClick={() => handleStarClick(rating)}
                style={{
                  fontSize: '50px',
                  cursor: "pointer",
                  color: rating <= userRating ? "gold" : "gray",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <p>Your Rating: {userRating}</p>
          <p>Overall Rating: {calculateAverageRating().toFixed(2)}</p>
        </div>
      </Card>
    </div>
  );
};

export default Blogs;

