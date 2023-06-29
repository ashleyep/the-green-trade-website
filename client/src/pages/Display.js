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
        <div className="displayPage">
            {postList.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <h1>{post.title}</h1>
                        <div>
                            <img src={post.url} alt="" className="post-image" />
                        </div>
                        <div className='postTextContainer'>Description: {post.postText}</div>
                        <h3>Contact Info: {post.contactInfo}</h3>
                        <h3>User: {post.author.name}</h3>
                        <div className='deletePost'>
                            {props.isAuth && post.author.id === (auth.currentUser?.uid || '') && (
                                <button onClick={() => { deletePost(post.id) }}>
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

export default Display;
