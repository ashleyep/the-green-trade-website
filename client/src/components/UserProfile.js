import React, { useEffect, useState } from "react";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import '../styles/Display.css';

function UserProfile({isAuth, userId}) {
  const [user, setUser] = useState(null);
//   const { userId } = useParams();
console.log("in user profile");
  // console.log(userId, "got the params")
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filteredPosts = posts.filter(
        (post) => post.author.id === userId
      );
      setPostList(filteredPosts);
      setUserName(filteredPosts[0]?.author.name || ""); 
    };
    getPosts();

    setUserName(postList[0]?.author.name || ""); 
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


  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
      <div>
        <div className="profileInfo">
          {/* {user ? ( */}
            <h2>{userName}</h2>
            {/* // <p>Email: {user.email}</p>
            // Display other user information as needed */}
          {/* ) : (
            <p>Please sign in to view your profile.</p>
          )} */}
        </div>
        <div className="displayPage">
          {postList.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <h1 className="title">{post.title}</h1>
                  {isAuth && post.author.id === (auth.currentUser?.uid || '') && (
                    <button onClick={() => { deletePost(post.id); }}>
                      delete
                    </button>
                  )}
                </div>
                <div className=".post-image-container">
                  <img src={post.url} alt="" className="post-image" />
                </div>
                <div className="footer">
                  <div className="name">{post.author.name}</div>
                  <div className="description">{post.postText}</div>
                  {/* <div className="contact">Contact Info: {post.contactInfo}</div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
    
}

export default UserProfile;
