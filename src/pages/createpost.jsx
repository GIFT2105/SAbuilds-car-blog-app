import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { FaRegPaperPlane } from 'react-icons/fa';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();

  const postsCollectionRef = collection(db, "posts");
  const storage = getStorage();
  const imagesRef = ref(storage, "images"); // Adjust the path to your storage folder.

  const createPost = async () => {
    if (!title || !postText || !imageUpload) {
      // Handle validation or show an error message.
      return;
    }

    // Generate a unique filename for the image.
    const imageName = v4() + "-" + imageUpload.name;

    const imageRef = ref(imagesRef, imageName);

    try {
      // Upload the image to Firebase Storage.
      await uploadBytes(imageRef, imageUpload);

      // Get the download URL for the uploaded image.
      const imageUrl = await getDownloadURL(imageRef);

      // Create the post with imageUrl included:
      const post = {
        title,
        postText,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        imageUrl, // Include the imageUrl in the post data.
      };

      // Add the post to Firestore with imageUrl.
      await addDoc(postsCollectionRef, post);

      // Redirect to the home page or any other page.
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="createPostPage w-screen h-screen items-center flex flex-col justify-center ">
      <div className="cpContainer flex flex-col items-center text-center bg-slate-300 bg-opacity-80 w-96 rounded-2xl  ">
        <h1 className="font-first text-5xl  mb-32  mt-20      ">Create A Post</h1>
        <div className="inputGp">
          <label className="font-serif text-2xl   "> Title : <br/> </label>
          <input className=" bg-slate-100 w-96 rounded-xl text-center mt-4 mb-10 text-xl font-bold font-second     "
            placeholder ="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp flex flex-col">
          <label className="font-serif text-2xl   "   > Post:</label>
          <textarea className=" bg-slate-100 w-96 rounded-xl text-center mt-4 mb-10 text-xl font-bold font-second h-32     "
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <div className="inputGp flex flex-row text-center">
          <label className="font-serif text-2xl justify-center ml-20   "    > Image : </label>
          <input  className="rounded-full font-serif   "
            type="file"
            accept="image/*" 
            onChange={(event) => {
              const selectedFile = event.target.files[0];
              setImageUpload(selectedFile);
            }}
          />
        </div>
        <div className="flex flex-row text-center items-center">
       
        <button className="text-2xl font-second bg-gray-300 rounded-lg w-40 h-10 mt-10 mb-10 font-bold flex flex-row text-center items-center " onClick={createPost}>
      
        <FaRegPaperPlane className="mt-1 mr-2 ml-1"/>
        Submit Post

        </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;