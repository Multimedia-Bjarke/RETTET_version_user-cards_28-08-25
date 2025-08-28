import { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}: Kunne ikke hente data`
          );
        }
        const data = await response.json();
        setPosts(data.slice(0, 10)); // Vis kun første 10 posts
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  //Vis loading besked
  if (loading) {
    <div className="posts-section">
      <h2>Latest Posts</h2>
      <p>⏳ Henter posts...</p>
    </div>;
  }

  //Vis fejl besked
  if (error) {
    return (
      <div className="posts-section">
        <h2>Latest Posts</h2>
        <p style={{ color: "red" }}>❌ Fejl: {error}</p>
        <button onClick={() => window.location.reload()}>🔄 Prøv igen</button>
      </div>
    );
  }

  //Vis data når alt er OK

  return (
    <div>
      <h2>Latest Posts from JSONPlaceholder</h2>
      <p className="api-info">✅ {posts.length} posts hentet succesfuldt!</p>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
