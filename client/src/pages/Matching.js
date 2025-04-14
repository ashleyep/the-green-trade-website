import React, { useState, useEffect, useRef } from "react";
import { getDocs, deleteDoc, doc, addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'
import '../styles/Matching.css';
import MatchPopup from "../components/PopUp";



function Matching({ isAuth }) {

  const [user, setUser] = useState(null);
  const [postList, setPostList] = useState([]);
  const [index, setIndex] = useState(0);
  const postsCollectionRef = collection(db, "posts");
  const likesCollectionRef = collection(db, "likes");
  const [descriptionOffset, setDescriptionOffset] = useState(0);
  const [descriptionHeight, setDescriptionHeight] = useState(0); 
  const [ifFirstPost, setifFirstPost] = useState(true); 
  const [ifLastPost, setifLastPost] = useState(false); 
  const [match, setMatch] = useState(null);

  
  const handleMatchFound = (like) => {
      setMatch(like);
      console.log("handleMatchFound called");
  };

  const imageRef = useRef(null);
  const [showMatchModal, setShowMatchModal] = useState(false); //match ui popup
  
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
    // Like --> move forward, see if match
    if (event.key === 'ArrowRight') { // Right arrow key
      event.preventDefault();
      seeIfMatch()

     // Dislike --> move forward
    } else if (event.key === 'ArrowLeft') { // Left arrow key
      event.preventDefault();
      nextItem();
   
    }
     // Undo
    else if (event.key === 'u') { // Left arrow key
      event.preventDefault();
      prevItem();
  
    }
    else if  (event.key === 'ArrowDown'){
      event.preventDefault();
      console.log("desc", descriptionOffset)
      setDescriptionOffset((prevOffset) => {
        if (-prevOffset > 0) {
          setDescriptionHeight((prevHeight) => prevHeight - 10);
          return prevOffset + 10;
         
        }
        return prevOffset; // No change if condition isn't met
      });
        
      }
     

    else if  (event.key === 'ArrowUp'){
      event.preventDefault();
      // const imageHeight = imageRef.current?.offsetHeight || 0;
      const maxOffset = -(150); // Allow movement up to h
      setDescriptionOffset((prevOffset) => {
        if (prevOffset >= maxOffset) {
          setDescriptionHeight((prevHeight) => prevHeight + 10);
          return prevOffset - 10;
         
        }
        return prevOffset; // No change if condition isn't met
      });
        
      // setDescriptionOffset((prevOffset) => prevOffset - 10);
    
      console.log(maxOffset)
      console.log(descriptionOffset)
      }
      
  };

  window.addEventListener('keydown', handleKeyDown);

  // Clean up the event listener on unmount
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [postList]); // Re-run this effect if postList changes

const seeIfMatch = async () => {
  const data = await getDocs(likesCollectionRef);
  const likes = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
  // add to the table 

  // check if the user has already liked this post
  const alreadyLiked = likes.filter((like) => like.liker === auth.currentUser?.uid && like.postid === currentPost.id);
  if (alreadyLiked.length > 0) {
    console.log("already liked, going to the next item");
    nextItem()
    return;
  }
   
  // add like 
  await addDoc(likesCollectionRef, {
    likee: currentPost.author.id,
    liker: auth.currentUser.uid,
    postid: currentPost.id
  });       


  // want to see if the author of the post user just liked has liked any of the user's posts

  // first get author of current post 
  const author = currentPost.author.id;

  // look into the likes table to find if the author has liked any of the user's posts, 
  // so check where the liker is the author and the likee is the current user
  const mutualLikes = likes.filter((like) => like.liker === author && like.likee === auth.currentUser?.uid);

  mutualLikes.forEach((like) => {
    console.log("Match found:", like);
    console.log(like.postid);
    // show popup of match found 
    handleMatchFound(like); // Show popup
    MatchPopup({ like });
  });

  nextItem()

  
};


  const nextItem = () => {
   // TODO: add a screen for running out of posts 
    setIndex((prevIndex) => {
     if (prevIndex  + 1 !== postList.length) {
      prevIndex= (prevIndex + 1 + postList.length) % postList.length
      setifFirstPost(false)
      return prevIndex
    }
    // Change the color of the like and dislike - only undo button 
    setifLastPost(true)

    return prevIndex
    
  }
    );



  };
  
  // Function for the popup
  function MatchPopup({ match }) {
    return (
        <div className="popupStyle">
            <h2>You've got a match! </h2>
            <p>You matched with {match.postid}.</p>
            <button>Close</button>
        </div>
    );
  }

  // Function to format the title
  const formatTitle = (title) => {
    return title.split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  // Function to go to the previous item
  const prevItem = () => {
    setIndex((prevIndex) => {
      //if we get to beginning don't go back
     if (prevIndex >0) {
      prevIndex=  (prevIndex - 1 + postList.length) % postList.length
      setifLastPost(false)
      if (prevIndex === 0){
        setifFirstPost(true)
      }
      return prevIndex

    } 
    setifFirstPost(true)
    return prevIndex }
    );
  };




const currentPost = postList[index];
console.log(postList)
// console.log(postList)
// TODO: Scale image 
// Fix buttons to the bottom
useEffect(() => {
  // You can access the image height after it's rendered
  if (imageRef.current) {
    const imageHeight = imageRef.current.offsetHeight;
    console.log("Image height:", imageHeight);
  }
  setDescriptionOffset(0)
  setDescriptionHeight(0)
}, [currentPost]); // Re-run when currentPost chang


return (
  

  //ummmm do showMatchModal stuff here!!!
  //blah blah blah

  <div className="MatchingPage">  
    <div className = "mpTitle">Find something you like</div>
    <div className = "mpsubTitle">right arrow for what you like, left for things you don't, and 'u' to go back</div>
    {/* <div className="mpContainer"> */}
      {/* Display current post only */}
      {currentPost ? (
        <div className="m-post" key={currentPost.id}>
          <div className = "post-title">{formatTitle(currentPost.title)}</div>
          <div>
            <img src={currentPost.url} alt={currentPost.title} className="m-post-image" ref={imageRef}/>
          </div>
          <div className="post-description"
                       style={{ 
                        bottom: `${0}px`, // Adjust position
                        height: `${descriptionHeight+50}px`  // Adjust height
                        }}>
        
                <div>
                  {currentPost.postText}
                </div>
                <div className="additional-attributes">
              <p><strong>Size:</strong> {currentPost.size || "N/A"}</p>
              <p><strong>Style:</strong> {currentPost.style || "N/A"}</p>
              <p><strong>Type:</strong> {currentPost.type || "N/A"}</p>
            </div>
              
          </div>
        
        </div>
        
      
      ) : (
        <p>looks like we ran out of clothes oop</p>
      )}

    <div className = "buttons">
        
        
        <button className = "but" onClick={nextItem}><i className={ifLastPost ? "fa fa-x-dis fa fa-x" : "fa fa-x"} aria-hidden="true"></i>
        </button>
        <button className = "but" onClick={!ifFirstPost ? prevItem : null}>
  <i className={ifFirstPost ? "fa fa-undo-dis fa-undo" : " fa fa-undo"} aria-hidden="true"></i>
</button>
        <button className = "but" onClick={seeIfMatch}><i className={ifLastPost ? "fa fa-heart-dis fa-heart" : "fa fa-heart"} aria-hidden="true"></i>
        </button>
       
      </div>
    </div>


);
}

export default Matching;