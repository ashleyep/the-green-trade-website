import React, { useEffect, useState } from "react";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import '../styles/Display.css';
import UserProfile from "../components/UserProfile";

function Profile({isAuth}) {

  const userId = auth.currentUser?.uid || '';

  return (
    <UserProfile isAuth={isAuth} userId={userId} />
  );

}

export default Profile;
