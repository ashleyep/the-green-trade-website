import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import FilterPostsByType from "../components/FilterPostsByType"; // Import the new Filter component
import '../styles/Matching.css';

function FilterPosts({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const postsCollectionRef = collection(db, "posts");
  

  useEffect(() => {
    const fetchPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPostList(posts)
    };
    fetchPosts();
  }, []);

    // Function to filter posts by type
  const filterByType = (itemType) => {
    setSelectedType(itemType);
  };

  // Get filtered posts based on selected type
  const filteredPosts = selectedType
    ? postList.filter(post => post.type === selectedType)
    : postList;
      

  return (
    //  implement post ordering
    <div className="displayPage">
        {postList.map((post) => {
            return (
                <div className="post" key={post.id}>
                    <div className="post-header">
                        <h1 className="title">{post.title}</h1>
                        {/* <img src={post.author.photoURL} alt="Profile" className="profile-image"/> */}
                    </div>
                    <div className=".post-image-container">
                        <img src={post.url} alt="" className="post-image" />
                    </div>
                    <div className="footer">
                        <div className="name">{post.author.name}</div>
                        <div className='description'>Description: {post.postText}</div>
                        <div className="contact">Contact Info: {post.contactInfo}</div>
                        {/* <div className='deletePost'>
                            {props.isAuth && post.author.id === (auth.currentUser?.uid || '') && (
                                <button onClick={() => { deletePost(post.id) }}>
                                    delete
                                </button>
                            )}
                    </div> */}
                    </div>
                </div>
            );
        })}
    </div>
);
}
export default FilterPosts;