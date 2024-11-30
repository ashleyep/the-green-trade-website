import React, { useEffect, useState } from "react";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import '../styles/Profile.css';

function Profile(props) {
  const [user, setUser] = useState(null);
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filteredPosts = posts.filter(
        (post) => post.author.id === auth.currentUser?.uid
      );
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



  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="displayPage">
      {/* display user information */}
      <div>
        {user ? (
          <div className = "profileInfo">
            <h2>Welcome, {user.displayName}</h2>
            <p>Email: {user.email}</p>
            {/* Display other user information as needed */}
          </div>
        ) : (
          <p>Please sign in to view your profile.</p>
        )}
      </div>

      {/* <img
        src={auth.currentUser?.photoURL}
        alt="Profile"
        className="profile-image"
      /> */}
      {/* <h1>Hello {user.displayName}</h1> */}
      {postList.map((post) => {
        return (
          <div className="post" key={post.id}>
            <h1>{post.title}</h1>
            <div>
              <img src={post.url} alt="" className="post-image" />
            </div>
            <div className="postTextContainer">
              Description: {post.postText}
            </div>
            <h3>Contact Info: {post.contactInfo}</h3>
            <h3>User: {post.author.name}</h3>
            <div className="deletePost">
              {props.isAuth && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  delete
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
