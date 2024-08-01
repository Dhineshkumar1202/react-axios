import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';


const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm addUser={addUser} editingUser={editingUser} updateUser={updateUser} />
      <UserList users={users} setEditingUser={setEditingUser} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
