import React from 'react'

function contact() {
  return (
    <div>
        <legend>Contact Us</legend>
        
        <form action ="https://formspree.io/f/xdovgwez" method = "POST">
            <fieldset>
                {/* <label for ="first name">First Name</label> */}
                <input type= "text" placeholder="First Name"  id= "first name"></input>

                {/* <label for ="last name">Last Name</label> */}
                <input type= "text" placeholder="Last Name"  id= "last name"></input>

                {/* <label for = "email">Your Email</label> */}
                <input type="email" name = "email" id = "email"></input>

                <input type="text" placeholder = "Subject" id = "subject"></input>

                {/* <label for = "message box">Leave A Message</label> */}
                <textarea placeholder = "Message"  id = "message"></textarea>

                <input type="submit" ></input>
            </fieldset>

        </form>

    </div>
  )
}

export default contact
