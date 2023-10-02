import { format } from 'date-fns';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Post = ({ _id, title, summary, image, createdAt, author }) => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  const [countLikes, setCountLikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const [checkLikes, setCheckLikes] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const imgRef = useRef(null);

  const [offsetTop, setOffsetTop] = useState(0);

  const LikePost = async () => {
    // e.preventDefault();
    const res = await fetch(`http://localhost:4000/post/like/${_id}`, {
      method: 'PUT',
      credentials: 'include',
    });
    const result = await res.json();

    if (result?.message === 'user liked a post') {
      setCountLikes(result?.NumLikes);
    }
  };

  const handleUnlike = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/post/unlike/${_id}`, {
      method: 'PUT',
      credentials: 'include',
    });
    const result = await res.json();
    // console.log({ unlike: result.NumLikes });

    if (result?.NumLikes === undefined || result?.NumLikes === 0) {
      setCountLikes(0);
    }
  };

  const deleteCommentBtn = async (comment_id) => {
    await fetch(`http://localhost:4000/post/${_id}/${comment_id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  };
  const getLikesCount = async () => {
    const response = await fetch(`http://localhost:4000/post/likes/${_id}`);
    const data = await response.json();
    setCountLikes(data?.likes);
  };

  useEffect(() => {
    getLikesCount();
  }, [countLikes]);

  useEffect(() => {
    fetch(`http://localhost:4000/post/comments/${_id}`).then((response) => {
      response.json().then((postInfo) => {
        setCommentCount(postInfo?.commentCount);
        setComments(postInfo);
      });
    });
  }, [comments]);

  useEffect(() => {
    const getTop = imgRef.current.getBoundingClientRect();
    // console.log({ height: getTop?.top });
    setOffsetTop(getTop?.top);
  }, []);

  return (
    <div className="post">
      <div className="image" ref={imgRef}>
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + image} alt="cat" width={760} />
        </Link>
      </div>

      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author?.userName}</a>
          <time>{format(new Date(createdAt), 'MMM d , yyyy  HH:mm')}</time>
        </p>
        <p className="summary">
          {summary}{' '}
          <Link
            to={`/post/${_id}`}
            style={{
              color: 'green',
              cursor: 'pointer',
            }}
          >
            ..READ MORE
          </Link>
        </p>

        {showComments ? (
          <div
            className="render-container"
            style={{
              position: 'fixed',
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: '860px',
              bottom: '0',
              left: '0',
              right: '0',
              top: `${offsetTop} + 5rem`,
              zIndex: '999',
              margin: 'auto',
              overflowY: 'auto',
              height: '30rem',
              border: '2px solid #eee',
              borderTopRightRadius: '2rem',
              borderTopLeftRadius: '2rem',
              paddingRight: '1rem',
            }}
          >
            <p
              onClick={() => setshowComments(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,.4)',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#fff',
                padding: '.5rem',
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
            >
              X
            </p>
            {comments?.comments?.length > 0
              ? comments?.comments?.map((comment, index) => {
                  return (
                    <Modal
                      text={comment?.text}
                      key={index}
                      deleteComment={() => deleteCommentBtn(comment?._id)}
                    />
                  );
                })
              : null}
          </div>
        ) : null}

        <div className="call-to-action">
          <p onClick={LikePost}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            {countLikes}
          </p>
          <p onClick={handleUnlike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
              />
            </svg>
          </p>
          <p onClick={() => setshowComments((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span className="comment">{commentCount}</span>
          </p>
        </div>
      </div>

      {/* <Modal {...comments?.comments} setshowComments={setshowComments} /> */}
    </div>
  );
};

export default Post;
