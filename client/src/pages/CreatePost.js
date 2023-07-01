import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'
import '../styles/CreatePost.css';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [contactInfo, setContact] = useState("");
  const [url, setUrl] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  
  const createPost = async () => {
    try {
      if (!imageUpload) {
        throw new Error("Please select an image");
      }
  
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
  
      if (!url) {
        throw new Error("Error getting image URL");
      }
  
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User is not authenticated");
      }
  
      await addDoc(postsCollectionRef, {
        title,
        postText,
        contactInfo,
        url,
        author: { name: currentUser.displayName, id: currentUser.uid, photoURL: currentUser.photoURL },
      });
  
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };
  

  return (
    <div className="createPostPage">  
      <h1 id="createPostTitle">Create A Post</h1>
      <div className="cpContainer">
        <div className="inputGp" id="postTitle">
          <label className="inputDetails"> Title </label>
          <div className="inputDetails">
          <input
            placeholder="title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          </div>
        </div>

        <div className="inputGp" id="post">
          <label className="inputDetails"> Post </label>
          <div className="inputDetails">
            <textarea
            placeholder="description of your item..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
            />
          </div>
        </div>

        <div className="inputGp">
          <label className="inputGp" > Contact Info </label>
          <div className="inputDetails">
            <textarea
              placeholder="email/socials"
              onChange={(event) => {
                setContact(event.target.value);
              }}
            />
          </div>
      </div>

      <div className = "inputGp">
        <label className="inputDetails" > Image </label>
        <div className="inputFileDetails">
          <input type ="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
        </div>

        </div>
        <div className="inputDetails">
          <button onClick={createPost}> Submit Post</button>
        </div>
        </div>
    </div>
  );
}

export default CreatePost;