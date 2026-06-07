import { useState } from "react";
import API from "../api";

function PostForm({ refreshPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/posts", {
        title,
        body,
      });

      setTitle("");
      setBody("");

      refreshPosts();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) =>
          setBody(e.target.value)
        }
      />

      <br /><br />

      <button type="submit">
        Create Post
      </button>
    </form>
  );
}

export default PostForm;