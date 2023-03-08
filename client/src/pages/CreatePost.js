import React from 'react'

function CreatePost() {
  return (
    <div className = "createPostPage">
        <div className = "cpContainer">
            <body>



            <h1>Create A Post</h1>
            <div className = "inputGp">
                <label> Title: </label>
                <input placeholder="Title..."/>
            </div>
            <div className = "inputGp">
                <label> Post: </label>
                <textarea placeholder = "Post.."/>
            </div>

            <div class="banner">
                  <input type = "file" accept="image/*" id="banner-upload" hidden></input>
                  <label for="banner-upload" class="banner-upload-btn"><button>Submit Post</button></label>
            </div>


            </body>

        </div>
    </div>
  )
}

export default CreatePost