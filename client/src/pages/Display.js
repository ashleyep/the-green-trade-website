import React, { useEffect, useState } from 'react';
import { getDocs, deleteDoc, doc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import "../styles/Display.css";

function Display(props) {
    const [postList, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, []); // Empty dependency array to run the effect only once

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    return (
        //  implement post ordering
        <div className="displayPage">
            {postList.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <div className="post-header">
                            <h1 className="title">{post.title}</h1>
                            <img src={post.author.photoURL} alt="Profile" className="profile-image"/>
                        </div>
                        <div className=".post-image-container">
                            <img src={post.url} alt="" className="post-image" />
                        </div>
                        <div className="footer">
                            <div className="name">{post.author.name}</div>
                            <div className='description'>Description: {post.postText}</div>
                            <div className="contact">Contact Info: {post.contactInfo}</div>
                            <div className='deletePost'>
                                {props.isAuth && post.author.id === (auth.currentUser?.uid || '') && (
                                    <button onClick={() => { deletePost(post.id) }}>
                                        delete
                                    </button>
                                )}
                        </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Display;
