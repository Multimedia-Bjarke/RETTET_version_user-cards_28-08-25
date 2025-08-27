export default function User({ user }) {
  return (
    <div className="user-card">
      <img src={user.image} />
      <h2>{user.name}</h2>
      <p>Mail: {user.mail}</p>
    </div>
  );
}
