'use client';
import React, {useState, useContext} from 'react';
import {useSession, signIn} from 'next-auth/react';
import UserContext from '../../lib/userContext';

function ChatInput(props) {
  const {postId, refreshMessages, disabled, data} = props;
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const {data: session} = useSession();
  const user = useContext(UserContext);
  const username = user.user.username;
  const userId = user.user._id;

  const addComment = (e) => {
    e.preventDefault();

    setSending(true);
    setTimeout(() => {
      setSending(false);
    }, 1000);

    if (!input) return;

    const commentToSend = input;
    setInput('');

    const comment = {
      text: commentToSend,
      created_at: Date.now(),
      username: data.username == 'Anónimo' && data.userId == userId ? 'Anónimo' : username,
      verified: user.user.verified ? true : false,
    };

    const uploadComment = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addPostComment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          userId,
          postId,
        }),
      });
    };

    uploadComment();
    refreshMessages();
  };

  return (
    <>
      {!session ? (
        <div className='flex justify-center items-center gap-1 py-2 md:text-sm'>
          <button onClick={() => signIn('google')} className='text-action-blue font-medium'>
            Inicia sesión
          </button>
          <p className='font-light'>para poder comentar</p>
        </div>
      ) : (
        <>
          <form
            onSubmit={addComment}
            className='flex overflow-hidden w-full text-md md:text-sm h-10 relative justify-between md:px-4 pb-2'
          >
            <div className='border border-palette-gray w-full flex rounded-md overflow-hidden mx-2 md:mx-0'>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Escribe algo bonito aquí...'
                className='flex-1 bg-palette-black px-3 focus:outline-none w-full rounded-md'
              />
              <button
                type='submit'
                disabled={!input || disabled}
                className='bg-palette-purple text-primary font-medium px-6 py-[5px] disabled:bg-palette-gray disabled:text-secondary disabled:cursor-not-allowed ease-in-out'
              >
                {!sending ? (
                  <p className='-mt-0.5'>Enviar</p>
                ) : (
                  <svg
                    aria-hidden='true'
                    role='status'
                    className='inline-flex w-6 h-6 text-purple animate-spin'
                    viewBox='0 0 100 101'
                    fill='none'
                    stroke='2'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#E5E7EB'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default ChatInput;
