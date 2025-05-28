import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={{ width: '200px', backgroundColor: '#6d4c41', color: 'white', height: '100vh' }}>
      <h2 style={{ padding: '10px' }}>Coffee Admin</h2>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to="/" style={{ padding: '10px', color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/add-coffee" style={{ padding: '10px', color: 'white', textDecoration: 'none' }}>Add Coffee</Link>
        <Link to="/manage-ingredients" style={{ padding: '10px', color: 'white', textDecoration: 'none' }}>Manage Ingredients</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
