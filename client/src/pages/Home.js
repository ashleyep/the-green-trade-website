import React from 'react';
import post1 from './assets/post1.JPG';
import post2 from './assets/post2.jpg';

function Home() {
  //   const [ user, setUser ] = useState({}); //might need to change the useState to more complex

  // function handleCallbackResponse(response){
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById("signInDiv").hidden = true;

  // }
  // function handleSignOut(event) {
  //   //no person
  //   setUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: "737893750872-bcf10jid7au1v6b8u6c2psi2ohosgnt8.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     {theme: "outline", size: "large"}
  //   );

  //   google.accounts.id.prompt();
  // }, []);


  return (
    <div>Home
      <div>Hey</div>
      {/* <div id="signInDiv"></div>
       { Object.keys(user).length != 0 &&
         <button onClick = {(e) => handleSignOut(e)}>Sign Out</button>
       }
      
       {user &&
        <div>
          <img src = {user.picture}></img>
          <h3>{user.name}</h3>
        </div>
       } */}
    </div>
    
  )
}

export default Home;