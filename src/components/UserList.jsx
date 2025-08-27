import UserCard from "./UserCard";

function UserList({ users, onDelete }) {
  return (
    <section className="grid">
      {users.map(user => (
        <UserCard user={user} key={user.id} onDelete={onDelete} />
      ))}
    </section>
  );
}

export default UserList;
