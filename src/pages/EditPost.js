import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';

const EditPost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('summary', summary);
    if (image) {
      data.set('image', image);
    }
    data.set('id', id);

    const response = await fetch(`http://localhost:4000/post`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    if (response?.ok) {
      setRedirect(true);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo?.title);
        // setImage(postInfo?.image);
        setSummary(postInfo?.summary);
        setContent(postInfo?.content);
      });
    });
  }, []);

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <>
      <form onSubmit={updatePost}>
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

        <button type="submit" style={{ marginTop: '15px', cursor: 'pointer' }}>
          {' '}
          Update post
        </button>
      </form>
    </>
  );
};

export default EditPost;
