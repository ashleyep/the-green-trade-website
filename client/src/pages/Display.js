import React, { useEffect, useState } from 'react'
import {getDocs, deleteDoc, doc} from 'firebase/firestore' //returns all docs in collects
import {collection} from 'firebase/firestore'
import {db} from "../firebase-config"
import {auth} from "../firebase-config";
import  "../styles/Display.css";
function Display(isAuth) {
    const [postList, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            //get info about docs
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getPosts();
    });
    const deletePost = async(id) => {
        const postDoc = doc(db, "posts", id );
        await deleteDoc(postDoc);
    }
  return (
    <div className = "displayPage">
        {postList.map((post) => {
        return(
             <div className = "post"> 
                {/* {" "} */}
                {/* <div className ="title">  */}
                     <h1>{post.title}</h1>
                {/* </div > */}
                {/* <div className='postHeader'> 
                {" "} */}
                
               
                {/* {" "}
                </div> */}
                
                <div>
                <img src={post.url} alt="" className="post-image" />
                </div>
                <div className='postTextContainer'>Description: {post.postText}</div>
                <h3>Contact Info: {post.contactInfo}</h3>
                <h3>User: {post.author.name}</h3>
                <div className='deletePost'> 
                    {isAuth && post.author.id === auth.currentUser.uid && (
                        <button onClick = {() => {deletePost(post.id)}}> 
                        {" "}
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

export default Display