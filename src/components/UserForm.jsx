import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, editingUser, updateUser }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, user);
    } else {
      addUser(user);
    }
    setUser({ name: '', email: '' });
  };

  return (
    <div>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default UserForm;
