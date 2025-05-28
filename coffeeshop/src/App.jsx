import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddCoffee from './components/AddCoffee';
import ManageIngredients from './components/ManageIngredients';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-coffee" element={<AddCoffee />} />
            <Route path="/manage-ingredients" element={<ManageIngredients />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
