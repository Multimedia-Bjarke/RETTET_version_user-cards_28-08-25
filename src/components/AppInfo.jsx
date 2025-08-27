function AppInfo({ userCount }) {
  return (
    <div className="app-info">
      <p>Denne app viser {userCount} brugere</p>
      <p>Klik på Like-knappen for at give likes til dine favoritbrugere!</p>
    </div>
  );
}

export default AppInfo;
