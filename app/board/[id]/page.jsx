import Image from 'next/image';
import React from 'react';
import ChatMessages from '../../components/ChatMessages';

const DetailedPost = ({params}) => {
  return (
    <div className='flex flex-col justify-between h-full py-2'>
      {params.id}
      <ChatMessages postId={params.id} />
    </div>
  );
};

export default DetailedPost;
