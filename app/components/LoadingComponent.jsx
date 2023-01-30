import React from 'react';
import Image from 'next/image';

function LoadingComponent({size, text, textSize}) {
  return (
    <div
      className={`flex flex-col justify-center items-center mx-auto w-full h-full my-auto text-${textSize} font-bold`}
    >
      <Image
        src='/assets/images/purr.gif'
        width={size}
        height={size}
        alt='picture of a cat hiding dirt under the carpet'
        className='block'
      />
      <h2>{text}</h2>
    </div>
  );
}

export default LoadingComponent;
