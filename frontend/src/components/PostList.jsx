import API from "../api";
import { useState } from "react";

function PostList({ posts, refreshPosts }) {
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      refreshPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (post) => {
    const newTitle = prompt(
      "Enter new title:",
      post.title
    );

    if (newTitle === null) return;

    const newBody = prompt(
      "Enter new body:",
      post.body
    );

    if (newBody === null) return;

    try {
      await API.put(`/posts/${post.id}`, {
        title: newTitle,
        body: newBody,
      });

      refreshPosts();

    } catch (error) {
      console.error(error);
    }
  };

  const handleSummarize = async (id) => {
    try {

      setError("");
      setLoadingId(id);

      await API.post(
        `/posts/${id}/summarize`
      );

      refreshPosts();

    } catch (error) {

      setError(
        "Unable to generate summary. Please try again."
      );

      console.error(error);

    } finally {

      setLoadingId(null);

    }
  };

  return (
    <div>
      <h2>All Posts</h2>
      {error && (
        <p>{error}</p>
      )}

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>

          <p>{post.body}</p>

          {post.summary && (
            <div>
              <h4>Summary</h4>

              <p>{post.summary}</p>
            </div>
          )}

          {post.key_points && (
            <div>
              <h4>Key Points</h4>

              <ul>
                {post.key_points.map(
                  (point, index) => (
                    <li key={index}>
                      {point}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <button
            onClick={() =>
              handleEdit(post)
            }
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() =>
              handleDelete(post.id)
            }
          >
            Delete
          </button>

          <button
            onClick={() =>
              handleSummarize(post.id)
            }
            disabled={loadingId === post.id}
          >
            {loadingId === post.id
              ? "Generating..."
              : "Summarize"}
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;