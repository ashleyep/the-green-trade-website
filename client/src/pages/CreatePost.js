import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'

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
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Contact Info:</label>
          <textarea
            placeholder="Contact Info..."
            onChange={(event) => {
              setContact(event.target.value);
            }}
          />
        </div>
      <div className = "inputGp">
      <label> Image: </label>
      <input type ="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
      {/* <button onClick={uploadImage}>Upload Image</button> */}
      </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;