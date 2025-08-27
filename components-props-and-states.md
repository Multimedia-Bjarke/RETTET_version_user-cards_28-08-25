# React Øvelser: Props, State, useState, useEffect & Komponenter

Her er en udvidet guide med opgaver, der træner alle centrale emner for Props, State, useState, useEffect & Components.

---

## 1. Props: Vis alle data fra user-objektet

**Teori:**
Props er den måde, du sender data fra én komponent til en anden i React. Props gør det muligt at genbruge komponenter med forskellige data. Du kan modtage props som enkeltværdier eller som et helt objekt, og du kan bruge destructuring til at "pakke" værdierne ud.

Du arbejder med en users-datastruktur, som hentes fra:
`https://raw.githubusercontent.com/cederdorff/race/master/data/users.json`

Test URL'en i browseren og beskriv, hvad du ser.

Når data er hentet og konverteret til et array, ser hvert user-objekt sådan ud:

```js
{
  id: "ZfPTVEMQKf9vhNiUh0bj",
  image: "https://...",
  mail: "...",
  name: "...",
  title: "..."
}
```

### Props og destructuring

**Teori:**
Destructuring betyder at "pakke" værdier ud af et objekt, så du kan bruge dem direkte som variabler. Det gør koden mere overskuelig og nemmere at læse.

Eksempler:

```jsx
function User({ name, mail, title, image, id }) {
  // ...
}
function User(props) {
  // props.name, props.mail osv.
}
function User({ user }) {
  const { id, image, mail, name, title } = user;
  // ...
}
```

---

## Opgave 1: Props – Vis alle data fra user-objektet

**Formål:**
Du lærer at sende data til en komponent med props, og hvordan du kan modtage og bruge dem på forskellige måder.

### Step 1.0: Udforsk props og destructuring

**1. Prøv tre måder at modtage data i User-komponenten:**

- **Enkeltvis props med destructuring:**
  Du modtager hver værdi som en variabel direkte i funktionshovedet.

  ```jsx
  function User({ name, mail, title, image, id }) {
    // Nu kan du bruge name, mail osv. direkte
    console.log("Enkeltvis props:", name, mail, title, image, id);
  }
  // I App.jsx:
  <User name={user.name} mail={user.mail} title={user.title} image={user.image} id={user.id} />;
  ```

- **Props som ét objekt:**
  Du modtager alle props samlet i et objekt, og skal bruge fx props.name.

  ```jsx
  function User(props) {
    console.log("Props-objekt:", props);
  }
  // I App.jsx:
  <User name={user.name} mail={user.mail} title={user.title} image={user.image} id={user.id} />;
  ```

- **Hele user-objektet som én prop:**
  Du sender hele user-objektet som én prop og pakker det ud med destructuring.
  ```jsx
  function User({ user }) {
    const { id, image, mail, name, title } = user;
    console.log("User-objekt:", user);
  }
  // I App.jsx:
  <User user={user} />;
  ```

**2. Skriv en kommentar om forskellen på de tre metoder.**
Hvilken metode synes du er mest overskuelig? Hvorfor?

---

### Step 1.1: Vis alle props fra user-objektet

- Udvid `User`-komponenten, så den viser alle felter: id, image, mail, name, title.
- Skriv koden, så du kan se alle værdier på skærmen.

---

### Step 1.2: Styling

- Brug et `<img>`-tag til at vise billedet (`image`).
- Vis de andre felter som tekst.
- Gør det pænt og overskueligt – brug evt. CSS-klasser.

---

### Step 1.4: Kommentarer

- Skriv en kort kommentar over funktionshovedet, der forklarer hvad destructuring `{}` gør.

---

### Step 1.5: Modtag hele user-objektet som prop

- Refaktorér din komponent, så du modtager hele user-objektet som én prop.
- Du kan nu bruge destructuring til at pakke værdierne ud:
  ```jsx
  function User({ user }) {
    const { id, image, mail, name, title } = user;
    // ...
  }
  ```
- Alternativt kan du bruge dot-notation direkte:
  ```jsx
  function User({ user }) {
    // ...
    <p>{user.name}</p>
    <p>{user.mail}</p>
    // ...
  }
  ```
- Vælg den metode du synes er mest overskuelig - test gerne begge metoder!

---

## Opgave 2: State – Dynamiske data og interaktivitet

**Teori:**
State er Reacts måde at holde styr på data, der kan ændre sig over tid – fx inputfelter, klik på knapper eller data hentet fra en server. State oprettes med useState-hooket, og når du opdaterer state, genrender React din komponent med de nye data.

Eksempel:

```jsx
const [likes, setLikes] = useState(0);
```

**Step 2.1:** Tilføj en “like”-knap til hver bruger, der tæller antal likes med `useState` i `User`-komponenten.  
_Hjælp: Opret en state-variabel i User:_

```jsx
const [likes, setLikes] = useState(0);
```

_Lav en knap:_

```jsx
<button onClick={() => setLikes(likes + 1)}>Like</button>
```

**Step 2.2:** Vis antal likes på kortet og opdater det, når man klikker på knappen.  
_Hjælp: Vis likes med fx `<p>Likes: {likes}</p>`_

**Step 2.3:** Tilføj en “reset likes”-knap, der nulstiller likes for en bruger.  
_Hjælp:_

```jsx
<button onClick={() => setLikes(0)}>Reset likes</button>
```

**Step 2.4:** Gør det muligt at skjule/vis brugerens detaljer med en toggle-knap (brug state).  
_Hjælp: Opret en state-variabel:_

```jsx
const [showDetails, setShowDetails] = useState(true);
```

_Lav en knap:_

```jsx
<button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Skjul" : "Vis"} detaljer</button>
```

_Brug showDetails til at styre om detaljerne vises:_

```jsx
{
  showDetails && <div>{/* detaljer her */}</div>;
}
```

---

## Opgave 3: useEffect – Sideeffekter og datahentning

**Teori:**
useEffect er et React-hook, der bruges til at udføre "sideeffekter" i din komponent – fx hente data, logge til konsollen eller opdatere DOM. useEffect kører, når komponenten renderes, eller når en bestemt state/prop ændres. Du kan styre, hvornår useEffect kører, ved at angive en "dependency array" som andet argument.

Eksempel:

```jsx
useEffect(() => {
  // kode her
}, [likes]);
```

**Step 3.1:** Brug `useEffect` til at logge til konsollen, hver gang en bruger får et like.  
_Hjælp:_

```jsx
useEffect(() => {
  console.log("Likes:", likes);
}, [likes]);
```

**Step 3.2:** Brug `useEffect` til at vise en besked, når likes når 10.  
_Hjælp:_

```jsx
useEffect(() => {
  if (likes === 10) alert("Du har nået 10 likes!");
}, [likes]);
```

**Step 3.3:** Tilføj en loader/spinner, der vises mens brugerdata hentes i `App` (brug state og useEffect).  
_Hjælp: Opret en state-variabel til loading:_

```jsx
const [loading, setLoading] = useState(true);
```

_Sæt loading til false når data er hentet, og vis fx `Loading...` mens loading er true._

**Step 3.4:** Tilføj en useEffect, der viser en alert, hvis der ikke er nogen brugere i listen.  
_Hjælp:_

```jsx
useEffect(() => {
  if (users.length === 0) alert("Ingen brugere!");
}, [users]);
```

---

## Opgave 4: Components – Struktur og genbrug

**Teori:**
En komponent i React er en genanvendelig byggeklods, der kan indeholde både logik og UI. Ved at opdele din app i flere komponenter bliver koden mere overskuelig og nemmere at vedligeholde. Du kan importere og bruge dine egne komponenter, og du kan sende data og funktioner til dem via props.

**Step 4.1:** Lav en `Header`-komponent, der viser en overskrift for din app.  
_Hjælp: Opret en ny fil fx `Header.jsx` og lav en simpel komponent:_

```jsx
function Header() {
  return <h1>Brugeroversigt</h1>;
}
export default Header;
```

Importér og brug i App:

```jsx
import Header from "./Header";
```

**Step 4.2:** Lav en `UserList`-komponent, der modtager `users` som prop og viser listen af brugere.  
_Hjælp: Opret en ny fil fx `UserList.jsx` og brug map til at vise alle brugere:_

```jsx
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}
export default UserList;
```

Importér og brug i App:

```jsx
import UserList from "./UserList";
```

**Step 4.3:** Lav en `Footer`-komponent med copyright/info.  
_Hjælp: Opret en ny fil fx `Footer.jsx` og lav en simpel komponent:_

```jsx
function Footer() {
  return <footer>© 2025 Dit navn</footer>;
}
export default Footer;
```

Importér og brug nederst i App:

```jsx
import Footer from "./Footer";
```

**Step 4.4:** Lav en “UserCard”-komponent, som bruges af `UserList` til at vise hver bruger.  
_Hjælp: Opret en ny fil fx `UserCard.jsx` og brug den i stedet for User i UserList:_

```jsx
function UserCard({ user }) {
  // Vis brugerens data her
  return (
    <div>
      <img src={user.image} alt={user.name} />
      <p>{user.name}</p>
      <p>{user.mail}</p>
      <p>{user.title}</p>
    </div>
  );
}
export default UserCard;
```

Brug i UserList:

```jsx
import UserCard from "./UserCard";
// ...
{
  users.map(user => <UserCard user={user} key={user.id} />);
}
```

**Step 4.5 (Ekstra):** Lav en lille komponent, fx `AppInfo`, der viser information om appen (fx antal brugere eller en kort beskrivelse). Brug den i toppen eller bunden af din app.

---

## Opgave 5: Dataflow – Tilføj og fjern brugere

**Teori:**
Dataflow i React handler om, hvordan data bevæger sig gennem din app. Typisk "løber" data fra parent til child via props, og du kan opdatere data med state og event handlers. Når du vil ændre data (fx tilføje eller slette brugere), opdaterer du state i parent-komponenten, og sender eventuelle funktioner som props til child-komponenter.

**Step 5.1a:** Opret en state-variabel til brugerne, hvis ikke du allerede har:

```jsx
const [users, setUsers] = useState([]);
```

Test at din app ikke crasher, og at du kan bruge `users`.

**Step 5.1b:** Lav en simpel formular med ét inputfelt og en submit-knap:

```jsx
<form onSubmit={handleSubmit}>
  <input name="name" placeholder="Navn" />
  <button type="submit">Tilføj bruger</button>
</form>
```

Test at du kan skrive i feltet og trykke på knappen.

**Step 5.1c:** Lav en handleSubmit-funktion, der læser værdien fra inputfeltet og tilføjer en bruger til listen:

```jsx
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const newUser = {
    id: crypto.randomUUID(),
    name: form.name.value
  };
  setUsers([...users, newUser]);
  form.reset();
}
```

Test at du kan tilføje en bruger med navn til listen.

**Step 5.1d:** Udvid formularen med flere inputfelter (mail, titel, billede, alder):

```jsx
<form onSubmit={handleSubmit}>
  <input name="name" placeholder="Navn" />
  <input name="mail" placeholder="Mail" />
  <input name="title" placeholder="Titel" />
  <input name="image" placeholder="Billede-URL" />
  <input name="age" placeholder="Alder" />
  <button type="submit">Tilføj bruger</button>
</form>
```

Opdater handleSubmit, så den læser alle felter:

```jsx
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const newUser = {
    id: crypto.randomUUID(),
    name: form.name.value,
    mail: form.mail.value,
    title: form.title.value,
    image: form.image.value,
    age: form.age.value
  };
  setUsers([...users, newUser]);
  form.reset();
}
```

Test at du kan tilføje en bruger med alle felter.

**Step 5.2:** Når formularen submitter, tilføjes brugeren til listen (brug `setUsers`).

_Hjælp: Se eksemplet ovenfor – brugeren tilføjes i handleSubmit-funktionen._

**Step 5.3:** Tilføj en “slet bruger”-knap på hvert kort, der fjerner brugeren fra listen.

_Hjælp:_

1. Lav en funktion i din App-komponent, der kan fjerne en bruger fra listen:

```jsx
function handleDeleteUser(id) {
  setUsers(users.filter(user => user.id !== id));
}
```

2. Du kan også sende funktioner som props til dine komponenter – ligesom du sender data! Det gør det muligt for fx UserCard at "fortælle" App, at en bruger skal slettes. Eksempel:

```jsx
<UserCard user={user} onDelete={handleDeleteUser} />
```

3. Inde i UserCard kan du nu bruge funktionen, som du har fået som prop:

```jsx
<button onClick={() => onDelete(user.id)}>Slet</button>
```

Når du klikker på knappen, kaldes funktionen i App med brugerens id, og brugeren fjernes fra listen.

4. Test at du kan slette brugere fra listen ved at klikke på knappen.

---

## Opgave 6: Ekstra – Filtrering og søgning

**Teori:**
Filtrering og søgning i React handler om at vise et udsnit af dine data baseret på brugerens input. Du kan bruge state til at holde styr på søgetekst og filtervalg, og bruge JavaScript's array-metoder (fx filter og includes) til at vise de rigtige data.

**Step 6.1:** Tilføj en søgefunktion, så man kan filtrere brugere efter navn.  
_Hjælp: Opret en state-variabel til søgetekst:_

```jsx
const [searchTerm, setSearchTerm] = useState("");
```

_Filtrér brugere:_

```jsx
const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
```

**Step 6.2:** Tilføj en dropdown, så man kan filtrere brugere efter titel.  
_Hjælp: Opret en state-variabel til valgt titel og filtrér listen på baggrund af den._

**Step 6.3:** Vis antal viste brugere ud fra filteret.  
_Hjælp: Brug fx `{filteredUsers.length}` til at vise antal._

---

## Ekstra opgaver: Best Practices

**Step 7.1:** Tilføj default props

- Tilføj default props til fx `UserCard` og `UserList`, så de viser en placeholder eller standardtekst hvis data mangler.

**Step 7.2:** Tilføj fejlhåndtering, når du henter data med `fetch`

- Vis en fejlbesked, hvis data ikke kan hentes.
- Opgave: Udvid din datahentning i `App.jsx` med try/catch og vis en fejlbesked i UI.

---

## Ekstra opgave: Responsivt design

- Gør brugerlisten responsiv med CSS Flexbox eller Grid.
- Opgave: Tilføj en media query, så brugerlisten ser godt ud på både mobil og desktop.
- Bonus: Tilføj en opgave om at style kortene med hover-effekt og skygge.

---

## Ekstra opgave: Bedre komponentstruktur

- Opdel din app i flere små komponenter for bedre overskuelighed og genbrug.
- Opgave: Lav separate komponenter for SearchBar, UserForm og UserStats.
- Forklar med kommentarer, hvordan data og funktioner sendes mellem komponenter.

---

## Ressourcer

- [React Components](https://www.w3schools.com/react/react_components.asp)
- [React Props](https://www.w3schools.com/react/react_props.asp)
- [React useState Hook](https://www.w3schools.com/react/react_usestate.asp)
- [React useEffect Hook](https://www.w3schools.com/react/react_useeffect.asp)
- [Scrimba: Learn React](https://scrimba.com/learn-react-c0e)

God arbejdslyst!
