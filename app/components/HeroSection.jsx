'use client';
import React, {useEffect, useRef} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const scroller = useRef();
  const sections = useRef();

  useEffect(() => {
    let sectionSet = gsap.utils.toArray('.section-set');

    let to = gsap.to(sectionSet, {
      xPercent: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: scroller.current,
        pin: true,
        scrub: 2,
        pinSpacing: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: 1 / (sectionSet.length - 1),

        end: () => '+=' + window.innerWidth,
      },
    });

    return () => {
      to.kill();
    };
  }, []);

  return (
    <div className='overflow-hidden flex'>
      <div className='overflow-hidden '>
        <div
          id='sections'
          ref={scroller}
          className=' flex overflow-x-hidden text-white w-[300vw] m-0 relative h-screen'
        >
          <section
            ref={sections}
            className='section-set w-screen h-full bg-transparent flex items-center z-50 justify-center'
          >
            <div className='flex flex-col text-center gap-2 md:items-start'>
              <p className='text-3xl font-semibold md:text-4xl md:text-start'>
                Comparte lo que te preocupa
              </p>
              <p className='text-lg md:text-lg text-primary px-5 md:max-w-md md:px-0 text-start'>
                A veces, solo necesitamos desahogarnos. Puedes hacerlo de forma anónima o crear una
                cuenta, así podrás seguir el hilo de lo que ocurre. Otras personas pueden darte
                consejos o apoyo
              </p>
            </div>
            <Image
              src='/assets/images/purr-sad-dark.png'
              width={300}
              height={300}
              className='max-w-[70vw] max-h-[60vh]'
              alt='sad cat looking through a window'
            />
          </section>
          <section
            ref={sections}
            className='section-set w-screen h-full bg-white text-palette-gray flex items-center z-50 justify-center'
          >
            <div className='flex flex-col text-center gap-2 md:items-start'>
              <p className='text-3xl font-semibold md:text-4xl md:text-start'>
                Comenta otras publicaciones
              </p>
              <p className='text-lg md:text-lg px-5 md:max-w-md md:px-0 text-start'>
                Entre todos podemos ayudarnos a salir del pozo, pero recuerda que probablemente ni
                tú ni quién te comente sea un profesional de la salud mental. Es una comunidad de
                apoyo, pero si necesitas ayuda profesional no la busques aquí
              </p>
            </div>
            <Image
              src='/assets/images/purr-5.png'
              width={300}
              height={300}
              className='max-w-[70vw] max-h-[60vh]'
              alt='a cat comforting another one'
            />
          </section>
          <section
            ref={sections}
            className='section-set w-screen h-full flex items-center z-50 justify-center'
          >
            <div className='flex flex-col text-center gap-2 md:items-start'>
              <p className='text-3xl font-semibold md:text-4xl md:text-start'>Pórtate bien</p>
              <p className='text-lg md:text-lg px-5 md:max-w-md md:px-0 text-start'>
                A veces, solo necesitamos desahogarnos. Puedes hacerlo de forma anónima o crear una
                cuenta, así podrás seguir el hilo de lo que ocurre. Otras personas pueden darte
                consejos o apoyo
              </p>
            </div>
            <Image
              src='/assets/images/purr-monch.png'
              width={300}
              height={300}
              className='max-w-[70vw] max-h-[60vh]'
              alt='a cat chewing on a plant'
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
