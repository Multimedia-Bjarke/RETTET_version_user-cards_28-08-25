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

  // Step 5.1c og 5.1d: handleSubmit-funktion
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      id: crypto.randomUUID(),
      name: form.name.value,
      mail: form.mail.value,
      title: form.title.value,
      image: form.image.value
    };
    setUsers([...users, newUser]);
    form.reset();
  }

  // Step 5.3: Slet bruger funktion
  function handleDeleteUser(id) {
    setUsers(users.filter(user => user.id !== id));
  }

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

      {/* Step 5.1b og 5.1d: Formular til at tilføje brugere */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Navn</label>
        <input name="name" placeholder="Navn" required />
        <label htmlFor="mail">Mail</label>
        <input name="mail" placeholder="Mail" required />
        <label htmlFor="title">Title</label>
        <input name="title" placeholder="Titel" required />
        <label htmlFor="image">Billed-URL</label>
        <input name="image" placeholder="Billede-URL" required />
        <div className="btns">
          <button type="submit">Tilføj bruger</button>
        </div>
      </form>

      <UserList users={users} onDelete={handleDeleteUser} />
      <Footer />
    </div>
  );
}

export default App;
