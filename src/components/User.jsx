import { useState } from "react";

export default function User({ user }) {
  const [likes, setLikes] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  function handleLike() {
    setLikes(likes + 1);
  }
  function handleToggleDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <div className="user-card">
      <img src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <div className="btns">
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleToggleDetails}>{showDetails ? "Skjul detaljer" : "Vis detaljer"}</button>
      </div>
      {showDetails && (
        <div className="details">
          <p>Mail: {user.mail}</p>
          <p>ID: {user.id}</p>
          <p>Title: {user.title}</p>
        </div>
      )}
    </div>
  );
}
