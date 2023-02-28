import React from 'react';
import Image from 'next/image';

function LoadingComponent({size, text, textSize}) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-screen h-[calc(100vh-60px)] text-${textSize} font-medium`}
    >
      <Image
        src='/assets/images/purr.gif'
        width={size}
        height={size}
        alt='picture of a cat hiding dirt under the carpet'
        className='block'
        priority
      />
      <h2 className='px-4 py-2 text-center'>{text}</h2>
    </div>
  );
}

export default LoadingComponent;
