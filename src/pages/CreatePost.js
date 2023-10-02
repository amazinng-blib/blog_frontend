import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('image', image);
    data.set('content', content);
    data.set('summary', summary);

    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      credentials: 'include',
      body: data,
    });

    const resData = await response.json();

    if (resData?.message === 'posted successfully') {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <form onSubmit={createNewPost} className="create-post">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="summary"
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <Editor onChange={(newValue) => setContent(newValue)} value={content} />

        <div
          style={{
            marginTop: '4rem',
            cursor: 'pointer',
          }}
        >
          <button type="submit"> Create post</button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
