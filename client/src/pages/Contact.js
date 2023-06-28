import React from 'react'
import '../styles/Contact.css'

function contact() {
  return (
    <div className="contact">
        <legend>Contact Us</legend>
        <div className="form">
          <form action ="https://formspree.io/f/xdovgwez" method = "POST">
            <div className="fieldset">
              <fieldset>
                  
                  {/* <label for ="first name">First Name</label> */}
                  <input type= "text" placeholder="First Name"  id= "first_name" name = "first_name"required></input>
                  

                  {/* <label for ="last name">Last Name</label> */}
                  <input type= "text" placeholder="Last Name"  id= "last_name" name = "last_name" ></input>
                 
                  {/* <label for = "email">Your Email</label> */}
                  <input type="email" placeholder = "Email" id = "email" name ="email" required></input>
                  

                  <input type="text" placeholder = "Reason" id = "reason" name="reason" required></input>
                  

                  {/* <label for = "message box">Leave A Message</label> */}
                  <textarea type="text" placeholder = "Message"  id = "message" name="message" required></textarea>
                 

                  <input type="submit" id = "submit"></input>

                  {/* add javascript to make sure form cannot be submitted without entering all fields 
                  add red highlights or an alert box */}
              </fieldset>
            </div>  

          </form>
        </div>
      </div>
  )
}

export default contact
