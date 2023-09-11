import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";

function Home({ isAuth }) {
  const [posts, setPosts] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = [];

        querySnapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id; // Store the document ID in the post object
          postsData.push(post);
        });

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id, authorUid) => {
    if (currentUser && currentUser.uid === authorUid) {
      const confirmation = window.confirm("Are you sure you want to delete this post?");

      if (confirmation) {
        const postDoc = doc(db, "posts", id);

        try {
          // Delete the post from Firestore.
          await deleteDoc(postDoc);

          // Remove the deleted post from the local state.
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      }
    } else {
      // User is not the author of the post, so they can't delete it.
      alert("You can only delete your own posts.");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col w-screen ">
      <div className="flex flex-col text-center mt-10 rounded-2xl w-96 h-36 text-black">
        <h1 className="font-first mt-10 text-4xl font-bold">SABuilds101</h1>
        <p className="font-serif">#Respect every build</p>
      </div>

      {isAuth && (
        <div className="bg-gray-200 bg-opacity-100 border-4 border-gray-300 rounded-md w-screen  h-auto">
          <div className="postList">
            {posts.map((post, index) => (
              <div key={index} className="flex flex-col items-center border-4 mt-1 border-gray-300">
                <h1 className="text-2xl font-serif  font-bold mb-5  ">{post.title}</h1>
                
                {post.imageUrl && (
                  <img src={post.imageUrl} width={350} height={350} alt="Post" className="postImage rounded-xl mb-3 " />
                )}
                <p className="font-first text-xl   ">{post.postText}</p>
                <p className="font-first text-lg font-bold ">Author: {post.author.name}</p>
                {/* Check if the current user is the author before displaying the "Delete" button */}
                {currentUser && currentUser.uid === post.author.id && (
                  <button className="bg-gray-500 bg-opacity-90 w-40 rounded-lg text-black font-extrabold font-first text-xl mt-1    " onClick={() => deletePost(post.id, post.author.id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

