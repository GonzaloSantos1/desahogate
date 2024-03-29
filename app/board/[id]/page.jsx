import React from 'react';
import ChatMessages from './components/ChatMessages';

const DetailedPost = ({params}) => {
  const categories = [
    {name: 'Relaciones de pareja', color: 'action-red', selected: false},
    {name: 'Trabajo', color: 'action-yellow', selected: false},
    {name: 'Familia', color: 'action-blue', selected: false},
    {name: 'Amigos', color: 'action-green', selected: false},
    {name: 'Otros', color: 'action-purple', selected: false},
  ];
  return (
    <div className='flex flex-col justify-between h-[calc(100vh-64px)]'>
      <ChatMessages postId={params.id} categories={categories} />
    </div>
  );
};

export default DetailedPost;
