'use client';
import Image from 'next/image';
import Footer from './components/Footer';
import {CgMouse} from 'react-icons/cg';
import {GoHeart} from 'react-icons/go';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <main className='select-none flex flex-col justify-center overflow-hidden'>
      <div className='h-[calc(100vh-60px)] flex flex-col w-full items-center justify-center relative'>
        <h2 className='font-semibold text-center text-6xl md:text-8xl px-4 max-w-4xl tracking-wide'>
          Una plataforma donde llorar y palante.
        </h2>
        <Image
          src='/assets/images/purr-2.gif'
          width={400}
          height={400}
          alt='picture of a cat being holded'
          className='hidden lg:block absolute -left-36 top-10'
          priority
        />
        <Image
          src='/assets/images/purr-2.gif'
          width={300}
          height={300}
          alt='picture of a cat being holded'
          className='block lg:hidden absolute -left-28 top-10'
          priority
        />
        <div className='flex justify-center flex-col items-center gap-2 absolute bottom-2 text-center text-secondary'>
          <p className='text-xs'>Desliza para saber más</p>
          <CgMouse size={24} className='animate-bounce ' />
        </div>
      </div>
      <HeroSection />

      <div className='py-24 w-full flex flex-col items-center justify-center gap-32 text-primary px-24'>
        <div className='w-full flex justify-center items-center gap-12'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam atque libero illo
            architecto! Amet earum optio similique dignissimos magnam quia nulla quos commodi! Modi
            ipsa ex ut quaerat quam consequatur!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident expedita molestias
            minima perferendis culpa aperiam ipsum at quisquam debitis ab corrupti, hic harum unde
            aut voluptate. Eum deleniti officiis ratione.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa recusandae rem itaque
            similique illum neque accusamus consequatur amet debitis, libero labore, eum enim
            ducimus voluptatibus placeat quibusdam impedit optio quis?
          </p>
        </div>
        <button
          class='text-transparent bg-clip-text bg-gradient-to-r from-palette-purple to-action font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center justify-center gap-2 tracking-wide'
          type='button'
        >
          <div className='relative'>
            <span className='text-rose-500 animate-ping absolute inset-0'>
              <GoHeart size={24} />
            </span>
            <span className='text-rose-500'>
              <GoHeart size={24} />
            </span>
          </div>
          Explorar
        </button>
      </div>

      <Footer />
    </main>
  );
}
