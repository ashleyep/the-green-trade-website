import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { getDocs, deleteDoc, doc, addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../styles/Matches.css";

function Matches({ isAuth }) {
 let navigate = useNavigate();

  const [matchesByUser, setMatchesByUser] = useState({});
  const matchesCollectionRef = collection(db, "matches");
  const postsCollectionRef = collection(db, "posts");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
  
    const waitForAuthAndFetch = () => {
      const currentUser = auth.currentUser?.uid;
      console.log("Current user:", currentUser);
      if (!currentUser) {
        // Retry in 100ms
        setTimeout(waitForAuthAndFetch, 100);
        return;
      }
  
      const getLikes = async () => {
        try {
          const data = await getDocs(matchesCollectionRef);
          const matches = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
          const filteredMatches = matches.filter((match) => match.user === currentUser);
          console.log("Filtered Matches:", filteredMatches);
  
          const allUsersMatched = filteredMatches.flatMap((match) => match.matchedUsers || []);
          console.log("Matched user IDs:", allUsersMatched);
  
          const postsData = await getDocs(postsCollectionRef);
          const allPosts = postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
          const groupedPosts = {};
          allUsersMatched.forEach((userId) => {
            groupedPosts[userId] = allPosts.filter((post) => post.author.id === userId);
          });
  
          setMatchesByUser(groupedPosts);
        } catch (err) {
          console.error("Error fetching matches/posts:", err);
        } finally {
          setLoading(false);
        }
      };
  
      getLikes();
    };
  
    waitForAuthAndFetch();
  }, []);
  // State to handle the current post index for each user
  const [currentPostIndex, setCurrentPostIndex] = useState({});

  const handleNext = (userId) => {
    setCurrentPostIndex((prev) => {
      const currentIndex = prev[userId] || 0;
      const totalPosts = matchesByUser[userId]?.length || 0;
  
      // Only increment if there are more posts
      if (currentIndex < totalPosts - 1) {
        return {
          ...prev,
          [userId]: currentIndex + 1,
        };
      }
  
      // No change if we're at the last post
      return prev;
    });
  };
  
  const handlePrev = (userId) => {
    setCurrentPostIndex((prev) => ({
      ...prev,
      [userId]: (prev[userId] || 0) > 0 ? (prev[userId] || 0) - 1 : 0
    }));
  };

  return (
    <div>
    <div className="Title">
      Your Matches
      </div>
    <div className="matches-grid">
      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(matchesByUser).length === 0 ? (
        <p>Sorry, no matches yet</p>
      ) : (
        Object.entries(matchesByUser).map(([userId, posts]) => {
          if (posts.length === 0) return null;

          const name = posts[0].author.name; // Assuming consistent author info per user
          const contact = posts[0].contactInfo; // Assuming consistent author info per user
          const authID = posts[0].author.id; // Assuming consistent author info per user

          const currentIndex = currentPostIndex[userId] || 0;
          const currentPost = posts[currentIndex];

          return (
            <div key={userId} className="matched-user-card">
              <div className="post-carousel">
                <button
                  onClick={() => handlePrev(userId)}
                  className="carousel-button left"
                >
                  ‹
                </button>

                <div className="post-card">
                  <div className="imageContainer">
                    <img
                      src={currentPost.url}
                      alt={currentPost.title}
                      className="m-post-image"
                    />
                  </div>
           
                </div>

                <button
                  onClick={() => handleNext(userId)}
                  className="carousel-button right"
                >
                  ›
                </button>
              </div>
              <div className="match-info">
                <Link to = {`/profiles/${authID}`} className="name">{name}</Link>
                <p>{contact}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
    </div>
  );
}

export default Matches;
