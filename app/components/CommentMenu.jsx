'use client';
import React, {useState} from 'react';

function CommentMenu({isOpen}) {
  const [modal, setModal] = useState(false);
  if (isOpen) {
    return (
      <div
        className='px-2 py-1 flex flex-col gap-1 items-center justify-center bg-slate-200 text-palette-gray text-xs absolute top-0 right-0 cursor-pointer'
        onClick={() => setModal(!modal)}
      >
        <span>!!</span>
        {modal && <button>Reportar</button>}
      </div>
    );
  }
}

export default CommentMenu;
