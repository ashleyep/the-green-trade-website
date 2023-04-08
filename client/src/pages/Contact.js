import React from 'react'

function contact() {
  return (
    <div>
        <legend>Contact Us</legend>
        
        <form action ="https://formspree.io/f/xdovgwez" method = "POST">
            <fieldset>
                {/* <label for ="first name">First Name</label> */}
                <input type= "text" placeholder="First Name"  id= "first name"></input>
                <br></br>

                {/* <label for ="last name">Last Name</label> */}
                <input type= "text" placeholder="Last Name"  id= "last name"></input>
                <br></br>
                {/* <label for = "email">Your Email</label> */}
                <input type="email" placeholder = "Email" id = "email"></input>
                <br></br>

                <input type="text" placeholder = "Subject" id = "subject"></input>
                <br></br>

                {/* <label for = "message box">Leave A Message</label> */}
                <textarea placeholder = "Message"  id = "message"></textarea>
                <br></br>

                <input type="submit" ></input>

                {/* add javascript to make sure form cannot be submitted without entering all fields 
                add red highlights or an alert box */}
            </fieldset>

        </form>

    </div>
  )
}

export default contact
