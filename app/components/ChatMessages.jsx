'use client';
import React, {useEffect, useState} from 'react';
import LoadingComponent from './LoadingComponent';
import ChatInput from './ChatInput';

function ChatMessages({postId}) {
  const [data, setData] = useState(null);

  const [refresh, setRefresh] = useState(false);

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
    const interval = setInterval(() => {
      setRefresh(false ? true : false);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshMessages = () => {
    setRefresh(true);
  };

  if (!data)
    return (
      <div className='flex flex-col justify-between h-full py-2'>
        <LoadingComponent size={300} text={'Cargando comentarios...'} textSize={'3xl'} />
        <ChatInput postId={postId} disabled={'disabled'} />
      </div>
    );
  return (
    <div className='flex flex-col justify-between h-full py-2'>
      <ul>
        {data[0].comments.map((e, index) => (
          <li key={index}>
            <p>{e.text}</p>
          </li>
        ))}
      </ul>
      <ChatInput postId={postId} refreshMessages={refreshMessages} />
    </div>
  );
}

export default ChatMessages;
