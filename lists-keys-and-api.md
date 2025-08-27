# React Øvelser: Lister, Keys & API Data

Disse opgaver understøtter undervisningen om lister, keys og datahentning fra eksterne kilder.

---

## 📋 Opgave 6: Lister & Keys - Forstå key-attributten

**Teori:**
Keys er et vigtigt koncept i React når du renderer lister. Keys hjælper React med at identificere hvilke elementer der har ændret sig, blev tilføjet eller fjernet. Dette gør React mere effektiv og forhindrer bugs.

### Step 6.1: Eksperimenter med keys

1. **Test uden keys:**

   - Fjern midlertidigt `key={user.id}` fra din UserList komponent
   - Åbn Developer Tools i browseren og kig efter warnings
   - Hvad sker der i konsollen?

2. **Test med dårlige keys:**

   ```jsx
   // ❌ Dårligt eksempel - brug ikke array index som key
   {
     users.map((user, index) => (
       <UserCard user={user} key={index} onDelete={handleDeleteUser} />
     ));
   }
   ```

   - Prøv at slette den første bruger og se hvad der sker
   - Hvad er problemet med at bruge index som key?

3. **Korrekt brug af keys:**
   ```jsx
   // ✅ Godt eksempel - brug unik id som key
   {
     users.map(user => (
       <UserCard user={user} key={user.id} onDelete={handleDeleteUser} />
     ));
   }
   ```

### Step 6.2: Skriv en kommentar om keys

Tilføj en kommentar i din UserList komponent der forklarer:

- Hvad keys er
- Hvorfor de er vigtige
- Hvad der gør en god key

---

## 🌐 Opgave 7: Multiple API Sources - Hent data fra forskellige kilder

**Teori:**
I praksis henter man ofte data fra forskellige API'er. Du lærer at arbejde med forskellige datastrukturer og håndtere asynkron datahentning.

### Step 7.1: Hent posts fra JSONPlaceholder

1. **Opret en ny komponent `PostList.jsx`:**

   ```jsx
   import { useState, useEffect } from "react";

   function PostList() {
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
       async function fetchPosts() {
         try {
           setLoading(true);
           const response = await fetch(
             "https://jsonplaceholder.typicode.com/posts"
           );
           if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
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

     if (loading) return <p>Loading posts...</p>;
     if (error) return <p>Error: {error}</p>;

     return (
       <div>
         <h2>Latest Posts</h2>
         <ul>
           {posts.map(post => (
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
   ```

2. **Tilføj PostList til din App:**
   - Importér og vis PostList komponenten i App.jsx
   - Placer den under UserList

### Step 7.2: Sammenlign datastrukturer

1. **Undersøg data:**

   - Åbn `https://jsonplaceholder.typicode.com/posts` i browseren
   - Sammenlign med `https://raw.githubusercontent.com/cederdorff/race/master/data/users.json`
   - Hvad er forskellene i datastruktur?

2. **Skriv kommentarer:**
   - Forklar forskellen mellem users og posts data
   - Hvordan påvirker forskellige datastrukturer din kode?

---

## ⚡ Opgave 8: Loading States & Error Handling (Simpel version)

**Teori:**
Når du henter data fra API'er skal du håndtere forskellige tilstande: loading, success og error. Det giver en bedre brugeroplevelse.

### Step 8.1: Simpel loading state

1. **Opdater PostList med bedre loading og error handling:**

   ```jsx
   import { useState, useEffect } from "react";

   function PostList() {
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
       async function fetchPosts() {
         try {
           setLoading(true);
           setError(null); // Reset fejl ved nyt forsøg

           const response = await fetch(
             "https://jsonplaceholder.typicode.com/posts"
           );
           if (!response.ok) {
             throw new Error(`Fejl ${response.status}: Kunne ikke hente data`);
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

     // Vis loading besked
     if (loading) {
       return (
         <div className="posts-section">
           <h2>Latest Posts</h2>
           <p>⏳ Henter posts...</p>
         </div>
       );
     }

     // Vis fejl besked
     if (error) {
       return (
         <div className="posts-section">
           <h2>Latest Posts</h2>
           <p style={{ color: "red" }}>❌ Fejl: {error}</p>
           <button onClick={() => window.location.reload()}>
             🔄 Prøv igen
           </button>
         </div>
       );
     }

     // Vis data når alt er OK
     return (
       <div className="posts-section">
         <h2>Latest Posts from JSONPlaceholder</h2>
         <p className="api-info">✅ {posts.length} posts hentet succesfuldt!</p>
         <ul className="posts-list">
           {posts.map(post => (
             <li key={post.id} className="post-item">
               <h3>
                 Post #{post.id}: {post.title}
               </h3>
               <p>
                 <strong>User ID:</strong> {post.userId}
               </p>
               <p>{post.body.substring(0, 100)}...</p>
             </li>
           ))}
         </ul>
       </div>
     );
   }

   export default PostList;
   ```

### Step 8.2: Test fejl handling

1. **Test hvad der sker ved netværksfejl:**

   - Slå din internetforbindelse fra
   - Genindlæs siden og se fejlbeskeden
   - Tænd internettet igen og klik "Prøv igen"

2. **Test med forkert URL:**
   - Ændr URL til noget forkert (fx `https://jsonplaceholder.typicode.com/wrong-url`)
   - Se hvilken fejl du får
   - Ret URL'en igen

### Step 8.3: Tilføj en manuel refresh knap

1. **Tilføj en refresh funktion:**

   ```jsx
   function PostList() {
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     async function fetchPosts() {
       try {
         setLoading(true);
         setError(null);

         const response = await fetch(
           "https://jsonplaceholder.typicode.com/posts"
         );
         if (!response.ok) {
           throw new Error(`Fejl ${response.status}: Kunne ikke hente data`);
         }

         const data = await response.json();
         setPosts(data.slice(0, 10));
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     }

     useEffect(() => {
       fetchPosts();
     }, []);

     return (
       <div className="posts-section">
         <h2>Latest Posts</h2>

         {/* Refresh knap der altid er synlig */}
         <button
           onClick={fetchPosts}
           disabled={loading}
           style={{
             marginBottom: "20px",
             padding: "10px 15px",
             backgroundColor: loading ? "#ccc" : "#007bff",
             color: "white",
             border: "none",
             borderRadius: "5px",
             cursor: loading ? "not-allowed" : "pointer"
           }}>
           {loading ? "⏳ Henter..." : "🔄 Refresh Posts"}
         </button>

         {loading && <p>⏳ Henter posts...</p>}

         {error && <p style={{ color: "red" }}>❌ Fejl: {error}</p>}

         {!loading && !error && posts.length > 0 && (
           <>
             <p className="api-info">✅ {posts.length} posts hentet!</p>
             <ul className="posts-list">
               {posts.map(post => (
                 <li key={post.id} className="post-item">
                   <h3>
                     Post #{post.id}: {post.title}
                   </h3>
                   <p>
                     <strong>User ID:</strong> {post.userId}
                   </p>
                   <p>{post.body.substring(0, 100)}...</p>
                 </li>
               ))}
             </ul>
           </>
         )}
       </div>
     );
   }
   ```

**Refleksion:** Sammenlign denne simple approach med den komplekse kode i din eksisterende UserList. Hvilken er lettere at forstå og vedligeholde?

---

## 🔄 Opgave 9: Simuler server opdateringer (Let version)

**Teori:**
I rigtige applikationer skal du ofte synkronisere lokale ændringer med serveren. Du lærer at sende data til API'er og håndtere response.

## 🔄 Opgave 9: Simuler server opdateringer (Let version)

**Teori:**
JSONPlaceholder er et "fake" API der simulerer server kommunikation. Det er perfekt til at øve sig med POST og DELETE requests uden en rigtig server.

### Step 9.1: Udforsk JSONPlaceholder API

1. **Test API'et i browseren:**

   - Åbn `https://jsonplaceholder.typicode.com/posts/1` i browseren
   - Åbn `https://jsonplaceholder.typicode.com/users` i browseren
   - Læs dokumentationen på `https://jsonplaceholder.typicode.com/`

2. **Hvad er JSONPlaceholder?**
   - Det returnerer fake data til testing
   - POST/PUT/DELETE requests simuleres men gemmer ikke data
   - Perfekt til at lære API kommunikation

### Step 9.2: Log API responses

1. **Tilføj console.log til din handleSubmit:**

   ```jsx
   async function handleSubmit(e) {
     e.preventDefault();
     const form = e.target;

     const newUser = {
       name: form.name.value,
       mail: form.mail.value,
       title: form.title.value,
       image: form.image.value
     };

     console.log("Sender til server:", newUser);

     try {
       // Simuler POST til server
       const response = await fetch(
         "https://jsonplaceholder.typicode.com/users",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json"
           },
           body: JSON.stringify(newUser)
         }
       );

       console.log("Response status:", response.status);

       const serverResponse = await response.json();
       console.log("Server svarede:", serverResponse);

       // Tilføj til lokal liste (med vores eget ID)
       const userWithId = {
         ...newUser,
         id: crypto.randomUUID()
       };

       setUsers([...users, userWithId]);
       form.reset();

       alert("✅ Bruger tilføjet!");
     } catch (error) {
       console.error("❌ Fejl:", error);
       alert("Kunne ikke tilføje bruger: " + error.message);
     }
   }
   ```

2. **Test og observer:**
   - Åbn Developer Tools (F12) og gå til Console tab
   - Tilføj en ny bruger
   - Se hvad der logges i konsollen

### Step 9.3: Simuler DELETE request

1. **Tilføj logging til handleDeleteUser:**

   ```jsx
   async function handleDeleteUser(id) {
     console.log("Sletter bruger med ID:", id);

     try {
       const response = await fetch(
         `https://jsonplaceholder.typicode.com/users/${id}`,
         {
           method: "DELETE"
         }
       );

       console.log("Delete response status:", response.status);

       // Fjern fra lokal liste
       setUsers(users.filter(user => user.id !== id));
       console.log("✅ Bruger slettet lokalt");
     } catch (error) {
       console.error("❌ Fejl ved sletning:", error);
       alert("Kunne ikke slette bruger: " + error.message);
     }
   }
   ```

### Step 9.4: Refleksion

**Spørgsmål til diskussion:**

1. Hvorfor returnerer JSONPlaceholder altid status 201 for POST requests?
2. Hvad er forskellen mellem at gemme data lokalt vs. på en server?
3. Hvorfor skal vi bruge `crypto.randomUUID()` i stedet for at stole på server ID?

**Opgave:** Skriv en kommentar i din kode der forklarer forskellen mellem rigtig server kommunikation og JSONPlaceholder simulation.

---

## 📊 Opgave 10: Kombiner data fra flere API kilder (Simpel version)

**Teori:**
Mange applikationer henter data fra flere API kilder og kombinerer dem. Du lærer at arbejde med flere fetch calls og at sammensætte data.

### Step 10.1: Hent data fra to kilder

1. **Opret en ny komponent `SimpleUserPosts.jsx`:**

   ```jsx
   import { useState, useEffect } from "react";

   function SimpleUserPosts() {
     const [users, setUsers] = useState([]);
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       async function fetchData() {
         console.log("🔄 Starter datahentning...");

         try {
           // Hent users først
           console.log("📥 Henter users...");
           const usersResponse = await fetch(
             "https://jsonplaceholder.typicode.com/users"
           );
           const usersData = await usersResponse.json();
           console.log("✅ Users hentet:", usersData.length);
           setUsers(usersData.slice(0, 5)); // Kun første 5 users

           // Hent posts derefter
           console.log("📥 Henter posts...");
           const postsResponse = await fetch(
             "https://jsonplaceholder.typicode.com/posts"
           );
           const postsData = await postsResponse.json();
           console.log("✅ Posts hentet:", postsData.length);
           setPosts(postsData);

           console.log("🎉 Al data hentet!");
         } catch (error) {
           console.error("❌ Fejl ved datahentning:", error);
         } finally {
           setLoading(false);
         }
       }

       fetchData();
     }, []);

     if (loading) {
       return <div>⏳ Henter data fra to API kilder...</div>;
     }

     return (
       <div
         style={{
           border: "2px solid #007bff",
           padding: "20px",
           margin: "20px 0"
         }}>
         <h2>Users og deres Posts</h2>
         <p>
           📊 Data: {users.length} users og {posts.length} posts
         </p>

         {users.map(user => (
           <div
             key={user.id}
             style={{
               border: "1px solid #ccc",
               padding: "10px",
               margin: "10px 0"
             }}>
             <h3>
               {user.name} (User #{user.id})
             </h3>
             <p>📧 {user.email}</p>

             <h4>Posts af denne bruger:</h4>
             {posts
               .filter(post => post.userId === user.id)
               .slice(0, 2)
               .map(post => (
                 <div
                   key={post.id}
                   style={{
                     backgroundColor: "#f8f9fa",
                     padding: "8px",
                     margin: "5px 0"
                   }}>
                   <strong>Post #{post.id}:</strong> {post.title}
                 </div>
               ))}
           </div>
         ))}
       </div>
     );
   }

   export default SimpleUserPosts;
   ```

2. **Tilføj komponenten til App.jsx:**

   ```jsx
   import SimpleUserPosts from "./components/SimpleUserPosts";

   // I return delen:
   <SimpleUserPosts />;
   ```

### Step 10.2: Observer datahentningen

1. **Åbn Developer Tools og Console tab**
2. **Genindlæs siden og observer:**
   - I hvilken rækkefølge hentes data?
   - Hvor lang tid tager hver API call?
   - Hvad sker der hvis én af API calls fejler?

### Step 10.3: Parallel datahentning

1. **Opdater til parallel hentning med Promise.all:**

   ```jsx
   useEffect(() => {
     async function fetchData() {
       console.log("🔄 Starter parallel datahentning...");

       try {
         // Hent begge datasæt samtidig
         const startTime = Date.now();

         const [usersResponse, postsResponse] = await Promise.all([
           fetch("https://jsonplaceholder.typicode.com/users"),
           fetch("https://jsonplaceholder.typicode.com/posts")
         ]);

         const [usersData, postsData] = await Promise.all([
           usersResponse.json(),
           postsResponse.json()
         ]);

         const endTime = Date.now();
         console.log(`⚡ Data hentet på ${endTime - startTime}ms`);

         setUsers(usersData.slice(0, 5));
         setPosts(postsData);
       } catch (error) {
         console.error("❌ Fejl:", error);
       } finally {
         setLoading(false);
       }
     }

     fetchData();
   }, []);
   ```

### Step 10.4: Sammenlign performance

**Opgave:** Test både sequential og parallel datahentning og sammenlign tiderne i konsollen.

**Spørgsmål:**

1. Hvilken metode er hurtigst?
2. Hvornår ville du bruge sequential vs parallel hentning?
3. Hvad sker der hvis ét API call fejler i Promise.all?

---

## 🎯 Opgave 11: Filtrering og søgning

**Teori:**
Når du har data fra API'er vil du ofte filtrere og søge i dem. Dette er grundlæggende JavaScript kombineret med React state.

### Step 11.1: Simpel søgning i posts

1. **Tilføj søgefunktion til PostList:**

   ```jsx
   function PostList() {
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState("");

     // ... din fetch kode ...

     // Filtrér posts baseret på søgning
     const filteredPosts = posts.filter(
       post =>
         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         post.body.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
       <div className="posts-section">
         <h2>Latest Posts</h2>

         {/* Søgefelt */}
         <input
           type="text"
           placeholder="🔍 Søg i posts..."
           value={searchTerm}
           onChange={e => setSearchTerm(e.target.value)}
           style={{
             width: "100%",
             padding: "10px",
             marginBottom: "20px",
             border: "1px solid #ccc",
             borderRadius: "5px"
           }}
         />

         {loading && <p>⏳ Henter posts...</p>}

         {!loading && (
           <>
             <p>
               📊 Viser {filteredPosts.length} af {posts.length} posts
             </p>
             <ul className="posts-list">
               {filteredPosts.map(post => (
                 <li key={post.id} className="post-item">
                   <h3>
                     Post #{post.id}: {post.title}
                   </h3>
                   <p>{post.body.substring(0, 100)}...</p>
                 </li>
               ))}
             </ul>
           </>
         )}
       </div>
     );
   }
   ```

### Step 11.2: Filtrering på bruger ID

1. **Tilføj dropdown til at filtrere på user:**

   ```jsx
   const [selectedUserId, setSelectedUserId] = useState("");

   // Kombiner filtreringer
   const filteredPosts = posts.filter(post => {
     const matchesSearch =
       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.body.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesUser =
       selectedUserId === "" || post.userId.toString() === selectedUserId;

     return matchesSearch && matchesUser;
   });

   // I return delen:
   <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
     <input
       type="text"
       placeholder="🔍 Søg i posts..."
       value={searchTerm}
       onChange={e => setSearchTerm(e.target.value)}
       style={{ flex: 1, padding: "10px" }}
     />

     <select
       value={selectedUserId}
       onChange={e => setSelectedUserId(e.target.value)}
       style={{ padding: "10px" }}>
       <option value="">👥 Alle brugere</option>
       {[1, 2, 3, 4, 5].map(id => (
         <option key={id} value={id}>
           User {id}
         </option>
       ))}
     </select>
   </div>;
   ```

**Refleksion:** Hvordan påvirker disse filtre din brugeroplevelse? Hvad sker der med performance når data mængden vokser?

---

## 🎨 Bonus Opgaver (Valgfri)

### Bonus 1: Dark Mode Toggle

Tilføj en knap der skifter mellem lys og mørk tema for din app.

### Bonus 2: Favorit Posts

Lad brugere markere posts som favoritter og gem dem i localStorage.

### Bonus 3: Infinite Scroll

Implementer lazy loading - hent flere posts når brugeren scroller ned.

---

## 📚 Refleksionsspørgsmål

Efter du har gennemført opgaverne, diskuter:

1. **API Design:** Hvad er fordelene ved JSONPlaceholder sammenlignet med en rigtig database?
2. **Error Handling:** Hvordan kan man forbedre brugeroplevelsen når API calls fejler?
3. **Performance:** Hvornår er det bedre at hente data parallel vs sequential?
4. **State Management:** Bliver det sværere at håndtere state når du har flere API kilder?

---

## 🔗 Ressourcer

- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [JavaScript Fetch API](https://javascript.info/fetch)
- [React Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
- [Promise.all MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

God arbejdslyst! 🚀
