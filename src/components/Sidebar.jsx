import { useNavigate } from 'react-router-dom';

function Sidebar({ setCurrentPage }) {
  const navigate = useNavigate();

  const goToFront = () => {
    navigate('/');
  };

  return (
    <div style={{ width: '200px', backgroundColor: '#6d4c41', color: 'white', height: '100vh' }}>
      <h2 style={{ padding: '10px' }}>Coffee Admin</h2>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => setCurrentPage('dashboard')} style={btnStyle}>Dashboard</button>
        <button onClick={() => setCurrentPage('addcoffee')} style={btnStyle}>Add Coffee</button>
        <button onClick={() => setCurrentPage('manageingredients')} style={btnStyle}>Manage Ingredients</button>
        <hr style={{ margin: '10px 0' }} />
        <button onClick={goToFront} style={{ ...btnStyle, color: '#ffccbc' }}>⬅ დაბრუნება Front-ზე</button>
      </nav>
    </div>
  );
}

const btnStyle = {
  padding: '10px',
  color: 'white',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer'
};

export default Sidebar;
