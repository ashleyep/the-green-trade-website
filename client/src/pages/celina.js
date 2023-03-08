import React from 'react';
import app from '../firebase-config.js';
// import { getStorage, ref } from "firebase/storage";
function celina() {
     
    // const fileInput = document.querySelector("#fileInput");
    // const uploadButton = document.querySelector("#uploadButton");

    // // Initialize Firebase
    // // firebase.initializeApp({
    // // apiKey: "AIzaSyD3ZslRgr326mrxuWJd0A2VFK9vXwq_YNc",
    // // authDomain: "sustainable-fashion-website.firebaseapp.com",
    // // storageBucket: "sustainable-fashion-website.appspot.com",
    // // });

    // uploadButton.addEventListener("click", async () => {
    // const file = fileInput.files[0];

    // const storageRef = app.storage().ref();
    // const fileRef = storageRef.child(file.name);
    // const snapshot = await fileRef.put(file);
    // const imageUrl = await snapshot.ref.getDownloadURL();

    // console.log(imageUrl);
    //  });

   

/* stack overflow code
// takePhoto(sourceType:number) {
    //     const options: CameraOptions = {
    //       quality: 40,
    //       destinationType: this.camera.DestinationType.DATA_URL,
    //       encodingType: this.camera.EncodingType.JPEG,
    //       mediaType: this.camera.MediaType.PICTURE,
    //       correctOrientation: true,
    //       sourceType:sourceType,
    //     }
    
    //     this.camera.getPicture(options).then((imageData) => {
    //       let base64Image = 'data:image/jpeg;base64,' + imageData;
    //       this.uploadToStorage(base64Image);
    //     }, (err) => {
    //       // Handle error
    //     });
    //   }
    
    //   uploadToStorage(src) {
    //     this.uploadProgress = true;
    //     let storageRef = firebase.storage().ref();
    //     // Create a timestamp as filename
    //     this.imageFileName = Math.floor(Date.now() / 1000) + "_" + this.userData.uid;
    //     // Create a reference to 'images/todays-date.jpg'
    //     const imageRef = storageRef.child('posts/'+this.imageFileName+'.jpg');
    //     imageRef.putString(src, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
    //       snapshot.ref.getDownloadURL().then(downloadURL => {
    //         this.imageURL = downloadURL;
    //         this.uploadProgress = false;
    //         this.uploadSuccess = true;
    //         console.log(this.imageURL)
    //         this.logEvent("Uploaded Image");
    //       });
    //     }, (err) => {
    //       console.log(err)
    //     });
    //   }*/
    
    

    
  return (
    <div className ="celina"> 
    <form><input type="file" id="fileInput"></input>
    <button type="button" id="uploadButton">Upload</button>
  </form>
  </div>
   

    
  )
}

export default celina