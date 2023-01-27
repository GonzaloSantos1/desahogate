import Image from 'next/image';
import React from 'react';
import ChatMessages from '../../components/ChatMessages';

const DetailedPost = ({params}) => {
  const categories = [
    {name: 'Relaciones de pareja', color: 'action-5', selected: false},
    {name: 'Trabajo', color: 'action-3', selected: false},
    {name: 'Familia', color: 'action-2', selected: false},
    {name: 'Amigos', color: 'action-4', selected: false},
    {name: 'Otros', color: 'secondary', selected: false},
  ];
  return (
    <div className='flex flex-col justify-between h-full py-2'>
      <ChatMessages postId={params.id} categories={categories} />
    </div>
  );
};

export default DetailedPost;
