import React, {useState, useEffect} from 'react'
import {addDoc, collection} from 'firebase/firestore'
import {db, auth, storage} from "../firebase-config"
import { useNavigate } from 'react-router-dom';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'

function CreatePost(isAuth) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [contactInfo, setContact] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [url, setUrl] = useState("");
  const postCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  // const uploadImage = () => {  
   
  // };

  //post data
  // const uploadImage = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `image/`)
  // }
  const createPost = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    // const uploadTask = uploadBytes(imageRef, imageUpload).then(() => {
      const uploadTask = uploadBytes(imageRef, imageUpload);
      getDownloadURL(uploadTask).then((downloadURL) => {
        setUrl(downloadURL);
      })

    await addDoc(postCollectionRef, {
      title, 
      postText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
      url,
      contactInfo,
    });
    navigate("/display");
  };
  
  //redirects you to login if it doesn work
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  return (
    <div className = "createPostPage">
        <div className = "cpContainer">
            <h1>Create A Post</h1>
            <div className = "inputGp">
                <label> Title: </label>
                <input placeholder="Title..." onChange={(event) =>{setTitle(event.target.value)}}/>
            </div>
            <div className = "inputGp">
                <label> Description: </label>
                <textarea placeholder = "Description.."
                onChange ={(event) => {
                  setPostText(event.target.value);
                }}
                />
            </div>
            <div className = "inputGp">
                <label> Contact Info: </label>
                <textarea placeholder = "Contact Info.."
                onChange ={(event) => {
                  setContact(event.target.value);
                }}
                />
            </div>
            <div className = "inputGp">
                <label> Image: </label>
                <input type ="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
                {/* <button onClick={uploadImage}>Upload Image</button> */}
            </div>
            <button onClick={createPost}>Submit Post</button>
        </div>
    </div>
  )  
}

export default CreatePost