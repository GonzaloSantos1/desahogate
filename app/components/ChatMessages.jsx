'use client';
import React, {useEffect, useState, useContext} from 'react';
import LoadingComponent from './LoadingComponent';
import ChatInput from './ChatInput';
import UserContext from '../../lib/userContext';
import {IconChevronUp, IconChevronDown} from '@tabler/icons';
import AnimateHeight from 'react-animate-height';

function ChatMessages({postId, categories}) {
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const user = useContext(UserContext);
  const loggedUser = user.user.username;
  const loggedUserId = user.user._id;
  const [titleHeight, setTitleHeight] = useState('auto');

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
      {/** CARD TITLE AND TEXT */}
      <div className='flex justify-center items-center md:px-12 h-full'>
        <div className='flex flex-col justify-between h-full items-center w-full bg-transparent'>
          <div className=' mt-1  w-full px-3 md:px-8 pb-2 text-md md:text-sm flex justify-between flex-col gap-1'>
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
            {/** Smooth display showing/hiding card text */}
            <AnimateHeight duration={500} height={titleHeight}>
              <div className='relative'>
                <p className='font-medium text-primary'>{data[0].message}</p>
                <p className='text-secondary font-medium text-end text-xs'>
                  Hace {dateHandler(data[0].created_at)}
                </p>
              </div>
            </AnimateHeight>
          </div>
          <hr className='border-gray-600 w-full relative' />
          {/** button to show/hide the text */}
          <div className='relative bg-transparent w-full'>
            <button
              className='border-b border-l border-r rounded-bl-xl rounded-br-xl px-2 border-gray-600 md:hidden z-50 absolute bg-[#1A1A1A] right-[45%]'
              onClick={() => setTitleHeight(titleHeight === 0 ? 'auto' : 0)}
            >
              {titleHeight !== 0 ? <IconChevronUp /> : <IconChevronDown />}
            </button>
          </div>
          {/** Comments section */}
          <div
            id='post-commentaries'
            className='w-full flex-1 px-2 pb-1 overflow-y-auto flex flex-col-reverse relative'
          >
            <ul className='flex flex-col gap-2 items-start text-md'>
              {data[0].comments.map((e) => {
                let localeDate = new Date(e.created_at).toLocaleDateString().slice(0, -5);
                let localeTime = new Date(e.created_at).toLocaleTimeString().slice(0, -3);
                let time = localeDate + ' ' + localeTime;
                if (data[0].userId == loggedUserId && e.userId == loggedUserId) {
                  /** user messages if user = author */
                  return (
                    <li
                      key={e.created_at}
                      className=' font-bold text-end self-end bg-[#1A1A1A] py-2 pl-4 pr-3 rounded-xl max-w-[350px] md:max-w-[450px]'
                    >
                      <p className='text-action'>
                        {e.username ? e.username : e.userId.slice(0, -10)}
                      </p>
                      <p className='font-medium'>{e.text}</p>
                      <p className='text-secondary text-xs font-light text-start'>{time}</p>
                    </li>
                  );
                } else if (e.userId == loggedUserId) {
                  /** user messages if user != author */
                  return (
                    <li
                      key={e.created_at}
                      className=' font-bold text-end self-end bg-[#1A1A1A] py-2 pl-4 pr-3 rounded-xl max-w-[350px] md:max-w-[450px]'
                    >
                      <p className='text-action-red'>
                        {e.username ? e.username : e.userId.slice(0, -10)}
                      </p>
                      <p className='font-medium'>{e.text}</p>
                      <p className='text-secondary text-xs font-light text-start'>{time}</p>
                    </li>
                  );
                } else if (data[0].userId == e.userId) {
                  /** author messages if user != author */
                  return (
                    <li
                      key={e.created_at}
                      className=' font-bold text-start bg-[#1A1A1A] py-2 pr-4 pl-3 rounded-xl max-w-[350px] md:max-w-[450px]'
                    >
                      <p className='text-action'>
                        {e.username ? e.username : e.userId.slice(0, -10)}
                      </p>
                      <p className='font-medium'>{e.text}</p>
                      <p className='text-secondary text-xs font-light text-end'>{time}</p>
                    </li>
                  );
                } else {
                  /** non user/author messages */
                  /** if user hasn't changed the name after registering -> show cropped userId instead */
                  return (
                    <li
                      key={e.created_at}
                      className=' font-bold text-start bg-[#1A1A1A] py-2 pr-4 pl-3 rounded-xl max-w-[350px] md:max-w-[450px]'
                    >
                      <p className='text-blue-500'>
                        {e.username ? e.username : e.userId.slice(0, -10)}
                      </p>
                      <p className='font-medium'>{e.text}</p>
                      <p className='text-secondary text-xs font-light text-end'>{time}</p>
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
