import React, { useEffect, useState } from 'react';
import Post from '../Post';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then((res) =>
      res.json().then((post) => {
        setPosts(post?.getAllPost);
      })
    );
  }, []);
  return (
    <>
      {posts?.length > 0
        ? posts?.map((data, index) => {
            return <Post key={index} {...data} />;
          })
        : null}
    </>
  );
};

export default HomePage;
