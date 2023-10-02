import React, { useEffect } from 'react';

const Modal = ({ text, deleteComment }) => {
  //   console.log({ modal: text });

  useEffect(() => {
    console.log(text);
  }, []);
  return (
    <div className="modal">
      <div className="modal-container">
        <p>{text} </p>
        <button type="button" onClick={deleteComment}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
