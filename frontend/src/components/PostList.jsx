import API from "../api";

function PostList({ posts, refreshPosts }) {

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

  return (
    <div>
      <h2>All Posts</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>

          <p>{post.body}</p>

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

          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;