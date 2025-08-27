import { useState, useEffect } from "react";

function UserCard({ user }) {
  const [likes, setLikes] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Step 3.1: Log likes til konsollen
  useEffect(() => {
    console.log("Likes:", likes);
  }, [likes]);

  // Step 3.2: Alert når likes når 10
  useEffect(() => {
    if (likes === 10) {
      alert("Du har nået 10 likes!");
    }
  }, [likes]);

  function handleLike() {
    setLikes(likes + 1);
  }

  function handleResetLikes() {
    setLikes(0);
  }

  function handleToggleDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <div className="user-card">
      <img src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.mail}</p>
      <p>{user.title}</p>
      <div className="btns">
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleResetLikes}>Reset likes</button>
        <button onClick={handleToggleDetails}>
          {showDetails ? "Skjul detaljer" : "Vis detaljer"}
        </button>
      </div>
      {showDetails && (
        <div className="details">
          <p>ID: {user.id}</p>
        </div>
      )}
    </div>
  );
}

export default UserCard;
