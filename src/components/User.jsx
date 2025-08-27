export default function User({ name, mail, image }) {
  return (
    <div className="user-card">
      <img src={image} />
      <h2>{name}</h2>
      <p>Mail: {mail}</p>
    </div>
  );
}
