import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AddCoffee from './AddCoffee';
import ManageIngredients from './ManageIngredients';

const AdminLayout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'addcoffee':
        return <AddCoffee />;
      case 'manageingredients':
        return <ManageIngredients />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setCurrentPage={setCurrentPage} />
      <div style={{ flex: 1, padding: '20px' }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminLayout;
