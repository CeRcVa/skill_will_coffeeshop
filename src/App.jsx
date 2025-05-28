import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Front from './components/Front';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Front /></Layout>} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
