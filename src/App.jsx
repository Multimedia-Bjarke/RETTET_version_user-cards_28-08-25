import { useEffect, useState } from "react";
import User from "./components/User";

function App() {
  const [users, setUsers] = useState([]);
  // Step 3.3: Loader/spinner state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
      );
      const data = await response.json();

      setUsers(data);
      // Step 3.3: Sæt loading til false når data er hentet
      setLoading(false);
    }
    fetchUsers();
  }, []);

  // Step 3.4: Alert hvis der ikke er nogen brugere
  useEffect(() => {
    if (users.length === 0 && !loading) {
      alert("Ingen brugere!");
    }
  }, [users, loading]);

  // Step 3.3: Vis loader mens data hentes
  if (loading) {
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Users</h1>
      <section className="grid">
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}

export default App;
