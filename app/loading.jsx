import React from 'react';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className='flex justify-center items-center mx-auto w-full h-full my-auto text-5xl font-bold'>
      <Image
        src='/../public/assets/images/purr.png'
        width={300}
        height={300}
        alt='picture of a cat hiding dirt under the carpet'
        className='hidden md:block'
      />
      <h2>Loading</h2>
    </div>
  );
};

export default Loading;
