import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import '../styles/CreatePost.css';
import '../components/SelectBox.js';
import { SizeSelectBox, TypeSelectBox, StyleSelectBox, ShoeSizeSelectBox } from '../components/SelectBox.js';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [contactInfo, setContact] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [style, setStyle] = useState("");
  // const [url, setUrl] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    console.log("style:", style);  // Log the size value
    console.log("Type:", type);
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
        style,
        type,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });

      navigate("/Display"); // posts
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


        <label class="inputDetails"> Title </label>

        <input
          placeholder="title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <label class="inputDetails" > Image </label>

        <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />

        <label class="inputDetails"> Post </label>

        <textarea
          placeholder="description of your item..."
          onChange={(event) => {
            let cutoff = 62;
            if(event.target.value.length > cutoff){
              event.target.value = event.target.value.substring(0,62);
            }
            setPostText(event.target.value);
          }}
        />


        <label className="inputDetails" > Contact Info </label>
        <textarea
          placeholder="email/socials"
          onChange={(event) => {
            setContact(event.target.value);
          }}
        />

        <div class="inputDetails">
          <TypeSelectBox setType={setType}/>
        </div>

        <div class="inputDetails">
          <StyleSelectBox setStyle={setStyle} />
        </div>
       
        {type === "Shoes" ? (
          <div className="inputDetails">
            <ShoeSizeSelectBox setSize={setSize} />
          </div>
        ) : (
          <div className="inputDetails">
            <SizeSelectBox setSize={setSize} />
          </div>
        )}

        <div class="inputDetails">
          <button onClick={createPost}> Submit Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;