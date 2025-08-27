import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <section className="grid">
      {users.map(user => (
        <UserCard user={user} key={user.id} />
      ))}
    </section>
  );
}

export default UserList;
