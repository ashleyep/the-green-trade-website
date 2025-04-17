import React, { useEffect, useState } from "react";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import '../styles/Display.css';
import UserProfile from "../components/UserProfile";

function DisplayUser({isAuth}) {
 
  const { userId } = useParams();
  return (
    <UserProfile isAuth={isAuth} userId={userId} />
  );
}

export default DisplayUser;
