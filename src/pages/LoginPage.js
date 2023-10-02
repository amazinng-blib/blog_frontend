import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();

    if (response?.ok) {
      setUserInfo(data);
      setRedirect(true);
    } else {
      alert(data?.message);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      {!userInfo?.userName ? (
        <>
          <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button type="submit">login</button>
          </form>
        </>
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  );
};

export default LoginPage;
