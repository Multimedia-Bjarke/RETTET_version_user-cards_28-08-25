import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import Footer from "./components/Footer";
import AppInfo from "./components/AppInfo";

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
      <Header />
      <AppInfo userCount={users.length} />
      <UserList users={users} />
      <Footer />
    </div>
  );
}

export default App;
