import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Baby, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center space-x-2">
                <Baby className="h-7 w-7 text-pink-500" />
                <span className="font-bold text-xl text-gray-900">Kids Care</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">{user.name}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-pink-600 hover:text-pink-800">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-300">
                Connecting caring hearts with children in need through transparent
                and meaningful donations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/homes" className="text-gray-300 hover:text-white">
                    Children's Homes
                  </Link>
                </li>
                <li>
                  <Link to="/donate" className="text-gray-300 hover:text-white">
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">
                Email: support@kidscare.org<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            © {new Date().getFullYear()} Kids Care. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};