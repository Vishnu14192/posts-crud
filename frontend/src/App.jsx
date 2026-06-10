import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await API.get("/posts");

      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Posts Manager</h1>

      <PostForm refreshPosts={fetchPosts} />

      <hr />
      <PostList
        posts={posts}
        refreshPosts={fetchPosts}
      />
    </div>
  );
}

export default App;