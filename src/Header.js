import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  // API THAT CHECKS WHTHER TOKEN IS VALID
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  const logout = async () => {
    // INVALIDATE OUR COOKIE
    await fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });

    setUserInfo(null);
  };

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userInfo?.userName ? (
          <>
            <Link to={'/create'}>Create new post</Link>
            <button
              type="button"
              onClick={logout}
              style={{
                backgroundColor: 'inherit',
                color: '#333',
                cursor: 'pointer',
              }}
            >
              {' '}
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
