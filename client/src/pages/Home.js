import React from 'react';
// import post1 from './assets/post1.JPG';
// import post2 from './assets/post2.jpg';

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
    <div>
      <div class="home-grid">
      <h1>Promoting sustainable fashion by facilitating the exchange of clothes through our online trading platform.</h1>
      <img src={handEarth}/>
      </div>
      <div class="about-blurb">
        <h1 class="about-h1">The Green Trade?</h1>
        <h2>We believe that fashion should not come at the expense of our planet. That's why we're committed to promoting the reuse and recycling of clothes.

        Our platform allows people to trade clothes with people nearby, preventing high clothing consumption while still allowing people to revamp their wardrobe. By promoting a culture of conscious consumption, we hope to reduce the environmental impact of the fashion industry and create a more sustainable future for all.</h2>
      </div>
      <div class="our-services">
      <h2>We believe that fashion should not come at the expense of our planet. That's why we're committed to promoting the reuse and recycling of clothes.

      Our platform allows people to trade clothes with people nearby, preventing high clothing consumption while still allowing people to revamp their wardrobe. By promoting a culture of conscious consumption, we hope to reduce the environmental impact of the fashion industry and create a more sustainable future for all.</h2>
      </div>
    </div>
  )
}

export default Home;