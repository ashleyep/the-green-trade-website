import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { getDocs, deleteDoc, doc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import { Link } from 'react-router-dom';
import UserProfile from "../components/UserProfile";
import "../styles/Display.css";


const useQuery = () => new URLSearchParams(useLocation().search);

function Display(props) {
    const [postList, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    // parse query to get catagorey
    const query = useQuery();
    const selectedCategory = query.get("category") || "All Posts";

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, []); // Empty dependency array to run the effect only once

    const filteredPosts = postList.filter(post =>
        selectedCategory === "All Posts" || post.type === selectedCategory
       
      );
    console.log(selectedCategory)

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    return (
        //  implement post ordering
        <div>
        <div className="profileInfo">
        <h2>{selectedCategory}</h2> {/* Display selected category */}
      </div>
        <div className="displayPage">
            {filteredPosts.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <div className="post-header">
                            <h1 className="title">{post.title}</h1>
                            {props.isAuth && post.author.id === (auth.currentUser?.uid || '') && (
                                    <button  onClick={() => { deletePost(post.id) }}>
                                        Delete
                                    </button>
                                )}
                        </div>
                        <div className="post-image-container">
                            <img src={post.url} alt="" className="post-image" />
                        </div>
                        <div className="footer">
                            <Link to = {`/profiles/${post.author.id}`} className="name">{post.author.name}</Link>
                            <div className='description'> {post.postText}</div>
                            {/* <div className="contact">Contact Info: {post.contactInfo}</div> */}
                        </div>
                    </div>
                );
            })}
        </div>
        </div>
    );
}

export default Display;
