'use client';
import React, {useState} from 'react';

function ChatInput(props) {
  const {username} = props;
  const [input, setInput] = useState('');

  const addMessage = (e) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;
    setInput('');

    const message = {
      message: messageToSend,
      created_at: Date.now(),
      username: username,
    };

    const uploadMessage = async () => {
      const res = await fetch('/api/addPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();
      console.log('MENSAJE AÑADIDO >>>', data);
    };

    uploadMessage();
  };
  return (
    <form onSubmit={addMessage} className='flex max-w-xl w-full'>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter message here...'
        className='flex-1 bg-gray-300'
      />
      <button
        type='submit'
        disabled={!input}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
