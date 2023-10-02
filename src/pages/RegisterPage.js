import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response?.json();
      console.log({ reg: data });
      if (data?.message === 'success') {
        setRedirect(true);
      }
    } catch (error) {
      alert('Registration Failed. Try again later ');
    }
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }
  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          value={userName}
          id="userName"
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterPage;
