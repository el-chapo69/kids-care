import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Pencil, Trash2, X, UserPlus } from 'lucide-react';
import { ChildrensHome, User } from '../types';
import { AnalyticsDashboard } from '../components/analytics/AnalyticsDashboard';

interface HomeFormData {
  name: string;
  location: string;
  description: string;
  needs: string[];
  image: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  visitationHours: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const emptyHomeForm: HomeFormData = {
  name: '',
  location: '',
  description: '',
  needs: [''],
  image: '',
  contactInfo: {
    phone: '',
    email: '',
  },
  visitationHours: '',
};

const emptyUserForm: UserFormData = {
  name: '',
  email: '',
  password: '',
  role: 'user',
};

export const AdminDashboard: React.FC = () => {
  const { homes, addHome, updateHome, deleteHome } = useData();
  const { users, addUser, deleteUser } = useAuth();
  const [showHomeForm, setShowHomeForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingHome, setEditingHome] = useState<string | null>(null);
  const [homeFormData, setHomeFormData] = useState<HomeFormData>(emptyHomeForm);
  const [userFormData, setUserFormData] = useState<UserFormData>(emptyUserForm);
  const [activeTab, setActiveTab] = useState<'analytics' | 'homes' | 'users'>('analytics');

  const handleHomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHome) {
      updateHome(editingHome, homeFormData);
    } else {
      addHome(homeFormData);
    }
    setShowHomeForm(false);
    setHomeFormData(emptyHomeForm);
    setEditingHome(null);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(userFormData);
    setShowUserForm(false);
    setUserFormData(emptyUserForm);
  };

  const startEdit = (home: ChildrensHome) => {
    setEditingHome(home.id);
    setHomeFormData({
      name: home.name,
      location: home.location,
      description: home.description,
      needs: home.needs,
      image: home.image,
      contactInfo: home.contactInfo,
      visitationHours: home.visitationHours,
    });
    setShowHomeForm(true);
  };

  const handleDeleteHome = (id: string) => {
    if (window.confirm('Are you sure you want to delete this home?')) {
      deleteHome(id);
    }
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const updateNeeds = (index: number, value: string) => {
    const newNeeds = [...homeFormData.needs];
    newNeeds[index] = value;
    setHomeFormData({ ...homeFormData, needs: newNeeds });
  };

  const addNeed = () => {
    setHomeFormData({ ...homeFormData, needs: [...homeFormData.needs, ''] });
  };

  const removeNeed = (index: number) => {
    const newNeeds = homeFormData.needs.filter((_, i) => i !== index);
    setHomeFormData({ ...homeFormData, needs: newNeeds });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setShowUserForm(true);
              setUserFormData(emptyUserForm);
            }}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add User
          </button>
          <button
            onClick={() => {
              setShowHomeForm(true);
              setEditingHome(null);
              setHomeFormData(emptyHomeForm);
            }}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Home
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {(['analytics', 'homes', 'users'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'analytics' && <AnalyticsDashboard />}

      {activeTab === 'homes' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Manage Children's Homes</h2>
          </div>
          <div className="divide-y">
            {homes.map((home) => (
              <div key={home.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{home.name}</h3>
                  <p className="text-gray-500">{home.location}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(home)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteHome(home.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Manage Users</h2>
          </div>
          <div className="divide-y">
            {users.map((user) => (
              <div key={user.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showHomeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {editingHome ? 'Edit Home' : 'Add New Home'}
                </h2>
                <button
                  onClick={() => setShowHomeForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleHomeSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={homeFormData.name}
                    onChange={(e) => setHomeFormData({ ...homeFormData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={homeFormData.location}
                    onChange={(e) => setHomeFormData({ ...homeFormData, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={homeFormData.description}
                    onChange={(e) => setHomeFormData({ ...homeFormData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    value={homeFormData.image}
                    onChange={(e) => setHomeFormData({ ...homeFormData, image: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Needs</label>
                  {homeFormData.needs.map((need, index) => (
                    <div key={index} className="flex mt-2">
                      <input
                        type="text"
                        value={need}
                        onChange={(e) => updateNeeds(index, e.target.value)}
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeNeed(index)}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addNeed}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Add Need
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={homeFormData.contactInfo.phone}
                      onChange={(e) =>
                        setHomeFormData({
                          ...homeFormData,
                          contactInfo: { ...homeFormData.contactInfo, phone: e.target.value },
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={homeFormData.contactInfo.email}
                      onChange={(e) =>
                        setHomeFormData({
                          ...homeFormData,
                          contactInfo: { ...homeFormData.contactInfo, email: e.target.value },
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Visitation Hours</label>
                  <input
                    type="text"
                    value={homeFormData.visitationHours}
                    onChange={(e) =>
                      setHomeFormData({ ...homeFormData, visitationHours: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowHomeForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {editingHome ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add New User</h2>
                <button
                  onClick={() => setShowUserForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleUserSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={userFormData.email}
                    onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={userFormData.role}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, role: e.target.value as 'user' | 'admin' })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowUserForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};