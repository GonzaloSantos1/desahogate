'use client';
import React, {useEffect, useState, useContext} from 'react';
import LoadingComponent from './LoadingComponent';
import ChatInput from './ChatInput';
import UserContext from '../../lib/userContext';
import {IconChevronUp, IconChevronDown} from '@tabler/icons';
import AnimateHeight from 'react-animate-height';
import BoardDisplay from './BoardDisplay';
import Comments from './Comments';

function ChatMessages({postId, categories}) {
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const user = useContext(UserContext);
  const loggedUser = user.user.username;
  const loggedUserId = user.user._id;
  const [titleHeight, setTitleHeight] = useState('auto');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/getPosts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setRefresh(false);
      });
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    let interval = setInterval(() => {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/getPosts/${postId}`)
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
      </div>
    );
  return (
    <>
      {/** CARD TITLE AND TEXT */}
      <div className='flex justify-center items-center h-[calc(100vh-64px)]'>
        <div className='flex flex-col justify-between h-full items-center w-full bg-transparent flex-1'>
          <div className=' mt-1 w-full px-3 md:px-4 pb-2 text-md flex justify-between flex-col gap-1'>
            <div className='flex justify-between'>
              <p className='font-medium text-action'>{data[0].username}</p>
              {categories.map((e, index) => {
                if (e.name == data[0].category) {
                  return (
                    <p key={index} className={`text-${e.color} font-medium lowercase`}>
                      {data[0].category}
                    </p>
                  );
                }
              })}
            </div>
            <div className='relative hidden md:block'>
              <p className='font-light text-gray-700 dark:text-primary leading-[1.1] md:text-sm'>
                {data[0].message}
              </p>
              <p className='text-secondary font-medium text-end text-xs'>
                Hace {dateHandler(data[0].created_at)}
              </p>
            </div>
            {/** Smooth display showing/hiding card text */}
            <AnimateHeight duration={500} height={titleHeight}>
              <div className='relative md:hidden'>
                <p className='font-light text-primary leading-[1.1]'>{data[0].message}</p>
                <p className='text-secondary text-end text-xs'>
                  Hace {dateHandler(data[0].created_at)}
                </p>
              </div>
            </AnimateHeight>
          </div>
          <hr className='border-gray-200 dark:border-palette-gray w-full relative' />
          {/** button to show/hide the text */}
          <div className='relative bg-transparent w-full'>
            <button
              className='border-b border-l border-r rounded-bl-xl rounded-br-xl px-2 border-gray-200 dark:border-palette-gray md:hidden z-50 absolute bg-gray-100 dark:bg-palette-gray right-[45%]'
              onClick={() => setTitleHeight(titleHeight === 0 ? 'auto' : 0)}
            >
              {titleHeight !== 0 ? <IconChevronUp /> : <IconChevronDown />}
            </button>
          </div>
          {/** Comments section */}
          <div
            id='post-commentaries'
            className='w-full flex-1 px-2 pb-1 overflow-y-auto flex flex-col-reverse relative scroll-none'
          >
            <ul className='flex flex-col gap-2 items-start text-md md:px-2'>
              {data[0].comments.map((e) => {
                let localeDate = new Date(e.created_at).toLocaleDateString().slice(0, -5);
                let localeTime = new Date(e.created_at).toLocaleTimeString().slice(0, -3);
                let time = localeDate + ' ' + localeTime;
                let username = e.username;
                let timestamp = e.created_at;
                let text = e.text;
                let verified = e.verified;
                if (data[0].userId == loggedUserId && e.userId == loggedUserId) {
                  /** user messages if user = author */
                  return (
                    <Comments
                      key={timestamp}
                      time={time}
                      text={text}
                      username={username}
                      user={'userAuthor'}
                    />
                  );
                } else if (e.userId == loggedUserId) {
                  /** user messages if user != author */
                  return (
                    <Comments
                      key={timestamp}
                      time={time}
                      text={text}
                      username={username}
                      user={'userNoAuthor'}
                      verified={verified}
                    />
                  );
                } else if (data[0].userId == e.userId) {
                  /** author messages if user != author */
                  return (
                    <Comments
                      key={timestamp}
                      time={time}
                      text={text}
                      username={username}
                      user={'authorNoUser'}
                    />
                  );
                } else {
                  /** non user/author messages */
                  /** if user hasn't changed the name after register -> show cropped userId instead */
                  return (
                    <Comments
                      key={timestamp}
                      time={time}
                      text={text}
                      username={username}
                      user={'noUser'}
                      verified={verified}
                    />
                  );
                }
              })}
            </ul>
          </div>
          <ChatInput
            postId={postId}
            refreshMessages={refreshMessages}
            loggedUser={loggedUser}
            loggedUserId={loggedUserId}
            data={data}
          />
        </div>
        <div className='w-[20%] h-full border-l border-gray-200 dark:border-palette-gray overflow-hidden hidden md:block'>
          <h2 className='font-medium w-full text-center py-2 text-white bg-orange-400 dark:bg-palette-black dark:text-orange-600 text-md'>
            Otras publicaciones
          </h2>
          <div className='h-full pb-10 overflow-scroll scroll-none'>
            <BoardDisplay categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMessages;
