import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedCaption, setEditedCaption] = useState("");
  const [busyPostId, setBusyPostId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`);
        if (!Array.isArray(response.data.post)) {
          throw new Error("The posts API returned an unexpected response.");
        }
        setPosts(response.data.post);
      } catch (fetchError) {
        console.error("Error fetching posts:", fetchError);
        setError("Could not load posts. Check that the backend is running, then try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditedCaption(post.caption ?? "");
    setError("");
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditedCaption("");
  };

  const updatePost = async (postId) => {
    const caption = editedCaption.trim();
    if (!caption) {
      setError("Caption cannot be empty.");
      return;
    }

    setBusyPostId(postId);
    setError("");
    try {
      await axios.patch(`${API_URL}/posts/${postId}`, { caption });
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post._id === postId ? { ...post, caption } : post
        )
      );
      cancelEditing();
    } catch (updateError) {
      console.error("Error updating post:", updateError);
      setError("Could not update the caption. Please try again.");
    } finally {
      setBusyPostId(null);
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setBusyPostId(postId);
    setError("");
    try {
      await axios.delete(`${API_URL}/posts/${postId}`);
      setPosts((currentPosts) => currentPosts.filter((post) => post._id !== postId));
      if (editingPostId === postId) {
        cancelEditing();
      }
    } catch (deleteError) {
      console.error("Error deleting post:", deleteError);
      setError("Could not delete the post. Please try again.");
    } finally {
      setBusyPostId(null);
    }
  };

  return (
    <section className="feed-section">
      <h1>Feed</h1>
      {error && <p className="feed-error" role="alert">{error}</p>}
      {isLoading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="feed-empty">No posts yet. Create the first one to get started.</p>
      ) : (
        <div className="feed-list">
          {posts.map((post) => {
            const isEditing = editingPostId === post._id;
            const isBusy = busyPostId === post._id;

            return (
              <article className="post-card" key={post._id}>
                <header>Personal Feed</header>
                <img src={post.image} alt={post.caption || "Post image"} />
                <div className="post-content">
                  {isEditing ? (
                    <form
                      className="caption-edit-form"
                      onSubmit={(event) => {
                        event.preventDefault();
                        updatePost(post._id);
                      }}
                    >
                      <label htmlFor={`caption-${post._id}`}>Edit caption</label>
                      <input
                        id={`caption-${post._id}`}
                        type="text"
                        value={editedCaption}
                        onChange={(event) => setEditedCaption(event.target.value)}
                        maxLength={500}
                        autoFocus
                      />
                      <div className="post-actions">
                        <button type="submit" disabled={isBusy}>
                          {isBusy ? "Saving..." : "Save"}
                        </button>
                        <button
                          className="button-secondary"
                          type="button"
                          onClick={cancelEditing}
                          disabled={isBusy}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p>{post.caption}</p>
                      <div className="post-actions">
                        <button
                          type="button"
                          onClick={() => startEditing(post)}
                          disabled={isBusy}
                        >
                          Edit caption
                        </button>
                        <button
                          className="button-danger"
                          type="button"
                          onClick={() => deletePost(post._id)}
                          disabled={isBusy}
                        >
                          {isBusy ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
