import { getDocs, deleteDoc, doc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from "../firebase-config";
import { auth } from "../firebase-config";

const postsCollectionRef = collection(db, "posts");


export const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
};

export const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getUserPosts = async (userId) => {
    const data = await getDocs(postsCollectionRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return posts.filter((post) => post.author.id === userId);
};