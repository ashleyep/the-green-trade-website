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
  
      await addDoc(postsCollectionRef, {
        title,
        postText,
        contactInfo,
        url,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });
  
      navigate("/Display");
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };
  
  
  
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">  
      <h1 id="createPostTitle">Create A Post</h1>
      <div className="cpContainer">
        <div className="inputGp" id="postTitle">
          <label class="inputDetails"> Title </label>
          <div class="inputDetails">
          <input
            placeholder="title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          </div>
        </div>

        <div className="inputGp" id="post">
          <label class="inputDetails"> Post </label>
          <div class="inputDetails">
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
          <div class="inputDetails">
            <textarea
              placeholder="email/socials"
              onChange={(event) => {
                setContact(event.target.value);
              }}
            />
          </div>
      </div>

      <div className = "inputGp">
        <label class="inputDetails" > Image </label>
        <div class="inputFileDetails">
          <input type ="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
        </div>

        </div>
        <div class="inputDetails">
          <button onClick={createPost}> Submit Post</button>
        </div>
        </div>
    </div>
  );
}

export default CreatePost;