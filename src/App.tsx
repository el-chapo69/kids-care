import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { HomesList } from './pages/HomesList';
import { HomeDetails } from './pages/HomeDetails';
import { AdminDashboard } from './pages/AdminDashboard';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/homes" element={<HomesList />} />
              <Route path="/homes/:id" element={<HomeDetails />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute role="admin">
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;