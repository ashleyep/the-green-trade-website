import React, { useState, useEffect } from "react";
// import IconButton from '@mui/material/IconButton'; // Correct import for IconButton
// import ReplayIcon from '@mui/icons-material/Replay'; // Correct import for Replay icon
// import CloseIcon from '@mui/icons-material/Close'; // Correct import for Close icon
// import FavoriteIcon from '@mui/icons-material/Favorite'; // Correct import for Favorite icon
import { getDocs, deleteDoc, doc, addDoc, collection } from "firebase/firestore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'
import TinderCard from 'react-tinder-card'
import '../styles/Matching.css';
function Matching({ isAuth }) {

  const [user, setUser] = useState(null);
  const [postList, setPostList] = useState([]);
  const [index, setIndex] = useState(0);
  const postsCollectionRef = collection(db, "posts");
  const [IsDescriptionVisible, setIsDescriptionVisible] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
        navigate("/login");
    }
    

    // this filter would instead use the tagging system
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filteredPosts = posts.filter(
        (post) => post.author.id !== auth.currentUser?.uid
      );
      // Add sorting into this
      setPostList(filteredPosts);
    };
    getPosts();
    // firebase authentification observer 
    // onAuthStateChanged function updates the user state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    
    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once
//   function displayPosts(index){
    
useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') { // Right arrow key
      nextItem();
    } else if (event.key === 'ArrowLeft') { // Left arrow key
      prevItem();
    }
    else if  (event.key === 'ArrowDown'){
      showDecscrip();
    }
    else if  (event.key === 'ArrowUp'){
      closeDecscrip();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  // Clean up the event listener on unmount
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [postList]); // Re-run this effect if postList changes

  const nextItem = () => {
    setIndex((prevIndex) => (prevIndex + 1) % postList.length);
    closeDecscrip();
  };

  // Function to go to the previous item
  const prevItem = () => {
    setIndex((prevIndex) => 
      (prevIndex - 1 + postList.length) % postList.length
    );
    closeDecscrip();
  };

  const showDecscrip = () => {
   setIsDescriptionVisible(true);

  };

  const closeDecscrip = () => {
    setIsDescriptionVisible(false);
  };
//   }

// //   const postsCollectionRef = collection(db, "posts");

const currentPost = postList[index];
console.log(postList)
const onSwipe = (direction) => {
  console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen')
}

// TODO: Scale image 
// Fix buttons to the bottom
return (
  
  <div className="MatchingPage">  
    <div className = "mpTitle">Find something you like</div>
    <div className = "mpsubTitle">Right arrow for what you like, left for things you don't</div>
    {/* <div className="mpContainer"> */}
      {/* Display current post only */}
      {currentPost ? (
        <div className="post" key={currentPost.id}>
          <div className = "post-title">{currentPost.title}</div>
          <div>
            <img src={currentPost.url} alt={currentPost.title} className="post-image"/>
          </div>
          <div className="postTextContainer">
            {/* Show this only with down arrow */}
            {IsDescriptionVisible && (
                <div>
                  Description: {currentPost.postText}
                </div>
              )}
          </div>
        
         
        </div>
        
      
      ) : (
        <p>looks like we ran out of clothes oop</p>
      )}

    <div className = "buttons">
            
      {/* <TinderCard>Hello Wo</TinderCard> */}
        {/* <IconButton>
          <ReplayIcon/>
          </IconButton> */}
        {/* <FavoriteIcon/> */}
        <button className = "but" onClick={prevItem}><i class="fa fa-undo" aria-hidden="true"></i></button>
        <button className = "but" onClick={nextItem}><i className="fa fa-heart" aria-hidden="true"></i></button>
      </div>
    </div>

);
}

export default Matching;