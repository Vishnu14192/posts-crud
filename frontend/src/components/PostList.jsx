import API from "../api";
import { useState } from "react";

function PostList({ posts, refreshPosts }) {
  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  const [editBody, setEditBody] = useState("");

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
  };

  return (
    <div>
      <h2>All Posts</h2>

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