import API from "../api";
import { useState } from "react";

function PostList({ posts, refreshPosts }) {
  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

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

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const handleSave = async (id) => {
    try {
      await API.put(`/posts/${id}`, {
        title: editTitle,
        body: editBody,
      });

      setEditingId(null);
      refreshPosts();

    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditBody("");
  };

  const handleSummarize = async (id) => {
    try {
      setError("");
      setLoadingId(id);

      await API.post(`/posts/${id}/summarize`);

      refreshPosts();

    } catch (error) {

      const message =
        error.response?.data?.detail ||
        "Unable to generate summary";

      setError(message);

      console.error(error);

    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h2>All Posts</h2>

      {error && (
        <p
          style={{
            color: "red",
            marginBottom: "10px",
          }}
        >
          {error}
        </p>
      )}

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Summary</th>
            <th>Key Points</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>

              <td>
                {editingId === post.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(e.target.value)
                    }
                  />
                ) : (
                  post.title
                )}
              </td>

              <td>
                {editingId === post.id ? (
                  <input
                    value={editBody}
                    onChange={(e) =>
                      setEditBody(e.target.value)
                    }
                  />
                ) : (
                  post.body
                )}
              </td>

              <td>
                {post.summary || "-"}
              </td>

              <td>
                {post.key_points ? (
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "20px",
                    }}
                  >
                    {post.key_points.map(
                      (point, index) => (
                        <li key={index}>
                          {point}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  "-"
                )}
              </td>

              <td>
                {editingId === post.id ? (
                  <>
                    <button
                      onClick={() =>
                        handleSave(post.id)
                      }
                    >
                      Save
                    </button>

                    {" "}

                    <button
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
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

                    {" "}

                    <button
                      onClick={() =>
                        handleSummarize(post.id)
                      }
                      disabled={
                        loadingId === post.id
                      }
                    >
                      {loadingId === post.id
                        ? "Generating..."
                        : "Summarize"}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;