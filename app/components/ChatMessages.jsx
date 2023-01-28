'use client';
import React, {useEffect, useState, useContext} from 'react';
import LoadingComponent from './LoadingComponent';
import ChatInput from './ChatInput';
import UserContext from '../../lib/userContext';

function ChatMessages({postId, categories}) {
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const user = useContext(UserContext);
  const loggedUser = user.user.username;

  useEffect(() => {
    fetch(`http://localhost:3000/api/getPosts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setRefresh(false);
      });
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    let interval = setInterval(() => {
      fetch(`http://localhost:3000/api/getPosts/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setRefresh(false);
        });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const scrollToBottom = (interval) => {
    setTimeout(function () {
      document.getElementById('post-commentaries').scroll({
        top: document.getElementById('post-commentaries').scrollHeight,
        behavior: 'smooth',
      });
    }, interval);
  };

  const refreshMessages = () => {
    setRefresh(true);
    scrollToBottom(500);
  };

  function msToTime(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);

    if (minutes < 1) return 'Justo ahora';

    if (days < 1) return hours < 1 ? minutes + ' min' : hours + ' h ';

    if (days >= 1) return days == 1 ? days + ' día' : days + ' días';
  }

  const dateHandler = (postDate) => {
    const currentDate = Date.now();
    const postedDate = currentDate - postDate;

    return msToTime(postedDate);
  };

  if (!data)
    return (
      <div className='flex flex-col justify-between h-full py-2'>
        <LoadingComponent size={300} text={'Cargando comentarios...'} textSize={'3xl'} />
        <ChatInput postId={postId} disabled={'disabled'} />
      </div>
    );
  return (
    <div className='flex justify-center items-center px-24 py-5 h-full'>
      <div className='flex flex-col justify-between h-full py-2 items-center border rounded-md border-secondary w-full bg-gray-900'>
        <div className='bg-black border-b border-secondary w-full px-8 pb-2 text-sm flex justify-between'>
          <div className='flex flex-col'>
            <p className='font-bold text-action text-sm'>{data[0].username}</p>
            <p className='font-semibold text-primary'>{data[0].message}</p>
          </div>
          <div className='flex flex-col justify-center items-end'>
            {categories.map((e, index) => {
              if (e.name == data[0].category) {
                return (
                  <p key={index} className={`text-${e.color} font-semibold`}>
                    {data[0].category}
                  </p>
                );
              }
            })}
            <p className='text-secondary font-semibold'>
              Creado hace {dateHandler(data[0].created_at)}
            </p>
          </div>
        </div>
        <div
          id='post-commentaries'
          className='w-full h-full p-4 overflow-y-auto flex flex-col-reverse relative'
        >
          <ul>
            {data[0].comments.map((e) => {
              if (e.username == loggedUser) {
                return (
                  <li
                    key={e.created_at}
                    className='text-sm font-semibold flex flex-col justify-center items-end rounded-md bg-gray-800 my-1 p-1'
                  >
                    <p className='text-action-blue'>{e.username}</p>
                    <p className=''>{e.text}</p>
                  </li>
                );
              } else {
                return (
                  <li key={e.created_at} className='text-sm font-semibold text-start'>
                    <p className='text-secondary'>{e.username}</p>
                    <p className=''>{e.text}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <button
          onClick={() => scrollToBottom(0)}
          className='text-action-blue flex justify-end w-full px-3'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-circle-chevrons-down w-8 h-8'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M15 9l-3 3l-3 -3'></path>
            <path d='M15 13l-3 3l-3 -3'></path>
            <path d='M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z'></path>
          </svg>
        </button>
        <ChatInput postId={postId} refreshMessages={refreshMessages} />
      </div>
    </div>
  );
}

export default ChatMessages;
