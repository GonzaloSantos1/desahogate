'use client';
import React, {useState} from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

function ChatInput(props) {
  const {username, postId, refreshMessages, disabled} = props;
  const [input, setInput] = useState('');
  const {data: session} = useSession();

  const addComment = (e) => {
    e.preventDefault();

    if (!input) return;

    const commentToSend = input;
    setInput('');

    const comment = {
      text: commentToSend,
      created_at: Date.now(),
      username: 'fetch usuario',
    };

    const uploadComment = async () => {
      const res = await fetch(`/api/addPostComment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
        }),
      });
    };

    uploadComment();
    refreshMessages();
  };
  return (
    <>
      {!session ? (
        <>
          <p>Not signed in</p>
          <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <>
          <div>
            <h4>Signed in as {session.user.name}</h4>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <form onSubmit={addComment} className='flex px-2 rounded-md overflow-hidden'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter comment here...'
              className='flex-1 bg-black border border-primary px-2 focus:outline-none'
            />
            <button
              type='submit'
              disabled={!input || disabled}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed'
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
