'use client';
import React, {useState, useContext} from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
import UserContext from '../../lib/userContext';

function ChatInput(props) {
  const {postId, refreshMessages, disabled} = props;
  const [input, setInput] = useState('');
  const {data: session} = useSession();
  const user = useContext(UserContext);
  const username = user.user.username;
  const userId = user.user._id;

  const addComment = (e) => {
    e.preventDefault();

    if (!input) return;

    const commentToSend = input;
    setInput('');

    const comment = {
      text: commentToSend,
      created_at: Date.now(),
      username: username,
    };

    const uploadComment = async () => {
      const res = await fetch(`/api/addPostComment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          userId,
        }),
      });
    };

    uploadComment();
    refreshMessages();
  };
  return (
    <>
      {!session ? (
        <div className='flex justify-center items-center gap-1 py-2'>
          <button onClick={() => signIn()} className='text-action-2 font-semibold'>
            Inicia sesión
          </button>
          <p>para poder comentar</p>
        </div>
      ) : (
        <>
          <form
            onSubmit={addComment}
            className='flex px-4 rounded-md overflow-hidden w-full pt-2 text-sm h-12 relative'
          >
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter comment here...'
              className='flex-1 bg-black border border-secondary px-2 focus:outline-none w-full rounded-md'
            />
            <button
              type='submit'
              disabled={!input || disabled}
              className='bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-[5px] disabled:opacity-50 disabled:cursor-not-allowed absolute right-[17px] rounded-r-md top-[9px] ease-in-out'
            >
              Enviar
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default ChatInput;
