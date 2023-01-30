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
  const loggedUserId = user.user._id;

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
    <>
      {/* <button className='text-start px-2 w-7' onClick={() => history.back()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-arrow-left'
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
          <path d='M5 12l14 0'></path>
          <path d='M5 12l6 6'></path>
          <path d='M5 12l6 -6'></path>
        </svg>
      </button> */}
      <div className='flex justify-center items-center md:px-12 h-full'>
        <div className='flex flex-col justify-between h-full items-center w-full bg-[#101010]'>
          <div className='bg-[#101010] border-b mt-1 border-gray-600 w-full px-3 md:px-8 pb-2 text-md md:text-sm flex justify-between flex-col gap-1'>
            <div className='flex justify-between'>
              <p className='font-bold text-action'>{data[0].username}</p>
              {categories.map((e, index) => {
                if (e.name == data[0].category) {
                  return (
                    <p key={index} className={`text-${e.color} font-semibold`}>
                      {data[0].category}
                    </p>
                  );
                }
              })}
            </div>
            <p className='font-medium text-primary'>{data[0].message}</p>
            <p className='text-secondary font-medium text-end text-xs'>
              Hace {dateHandler(data[0].created_at)}
            </p>
          </div>
          <div
            id='post-commentaries'
            className='w-full flex-1 px-2 pb-1 overflow-y-auto flex flex-col-reverse relative'
          >
            <ul className='flex flex-col gap-2 items-start text-md'>
              {data[0].comments.map((e) => {
                if (data[0].userId == loggedUserId && e.userId == loggedUserId) {
                  return (
                    <li
                      key={e.created_at}
                      className=' font-bold text-end self-end bg-[#1A1A1A] py-2 pl-4 pr-3 rounded-xl max-w-[350px] md:max-w-[450px]'
                    >
                      <p className='text-action'>{e.username}</p>
                      <p className='font-medium '>{e.text}</p>
                    </li>
                  );
                } else if (e.userId == loggedUserId) {
                  return (
                    <li
                      key={e.created_at}
                      className=' font-bold text-end self-end bg-[#1A1A1A] py-2 pl-4 pr-3 rounded-xl max-w-[350px] md:max-w-[450px]'
                    >
                      <p className='text-action-red'>{e.username}</p>
                      <p className='font-medium '>{e.text}</p>
                    </li>
                  );
                } else if (data[0].userId == e.userId) {
                  return (
                    <li
                      key={e.created_at}
                      className=' font-bold text-start bg-[#1A1A1A] py-2 pr-4 pl-3 rounded-xl max-w-[350px] md:max-w-[450px]'
                    >
                      <p className='text-action'>{e.username}</p>
                      <p className='font-medium '>{e.text}</p>
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={e.created_at}
                      className=' font-bold text-start bg-[#1A1A1A] py-2 pr-4 pl-3 rounded-xl max-w-[350px] md:max-w-[450px]'
                    >
                      <p className='text-blue-500'>{e.username}</p>
                      <p className='font-medium '>{e.text}</p>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          {/* <button
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
          </button> */}
          <ChatInput
            postId={postId}
            refreshMessages={refreshMessages}
            loggedUser={loggedUser}
            loggedUserId={loggedUserId}
            data={data[0]}
          />
        </div>
      </div>
    </>
  );
}

export default ChatMessages;
