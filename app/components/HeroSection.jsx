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
      xPercent: -100 * (sectionSet.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: scroller.current,
        pin: true,
        scrub: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (sectionSet.length - 1),
          duration: 0.1,
          delay: 0.1,
          ease: 'power1.inOut',
        },

        end: () => '+=' + window.innerWidth,
      },
    });

    return () => {
      to.kill();
    };
  }, []);

  return (
    <>
      {/** TABLET + DESKTOP VERSION */}
      <div className='hidden overflow-hidden md:flex'>
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
              <div className='flex flex-col text-start gap-6 items-start justify-center '>
                <p className='text-6xl max-w-md font-semibold text-palette-gray dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-palette-purple dark:to-action'>
                  Comparte lo que te preocupa
                </p>
                <p className='text-xl text-gray-700 dark:text-primary md:max-w-md '>
                  A veces, solo necesitamos desahogarnos. Puedes hacerlo de forma anónima o crear
                  una cuenta, así podrás seguir el hilo de lo que ocurre. Otras personas pueden
                  darte consejos o apoyo
                </p>
              </div>
              <Image
                src='/assets/images/purr-sad-dark.png'
                width={400}
                height={400}
                alt='sad cat looking through a window'
              />
            </section>
            <section
              ref={sections}
              className='section-set w-screen h-full dark:bg-white flex items-center z-50 justify-center'
            >
              <Image
                src='/assets/images/purr-5.png'
                width={400}
                height={400}
                alt='a cat comforting another one'
              />
              <div className='flex flex-col text-start gap-6 items-start justify-center'>
                <p className='text-6xl max-w-md font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500'>
                  Comenta otras publicaciones
                </p>
                <p className='text-xl text-gray-700 md:max-w-md'>
                  Entre todos podemos ayudarnos a salir del pozo, pero recuerda que probablemente ni
                  tú ni quién te comente sea un profesional de la salud mental. Es una comunidad de
                  apoyo, pero si necesitas ayuda profesional no la busques aquí
                </p>
              </div>
            </section>
            <section
              ref={sections}
              className='section-set w-screen h-full flex items-center z-50 justify-center'
            >
              <div className='flex flex-col text-start gap-6 items-start justify-center'>
                <p className='text-6xl max-w-md font-semibold text-transparent bg-clip-text bg-gradient-to-r to-rose-400 from-pink-600'>
                  Pórtate bien
                </p>
                <p className='text-xl text-gray-700 dark:text-primary md:max-w-md'>
                  A veces, solo necesitamos desahogarnos. Puedes hacerlo de forma anónima o crear
                  una cuenta, así podrás seguir el hilo de lo que ocurre. Otras personas pueden
                  darte consejos o apoyo
                </p>
              </div>
              <Image
                src='/assets/images/purr-monch.png'
                width={400}
                height={400}
                alt='a cat chewing on a plant'
              />
            </section>
          </div>
        </div>
      </div>
      {/** MOBILE VERSION */}
      <div className='md:hidden h-screen flex flex-col items-center justify-center gap-6 px-6 text-center'>
        <p className='text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-400'>
          Comparte lo que te preocupa
        </p>
        <p className='text-lg text-gray-700 dark:text-primary'>
          A veces, solo necesitamos desahogarnos. Puedes hacerlo de forma anónima o crear una
          cuenta, así podrás seguir el hilo de lo que ocurre. Otras personas pueden darte consejos o
          apoyo
        </p>
        <Image
          src='/assets/images/purr-sad-dark.png'
          width={350}
          height={350}
          alt='sad cat looking through a window'
        />
      </div>
      <div className='md:hidden h-screen bg-white flex flex-col items-center justify-center gap-6 px-6 text-center'>
        <p className='text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500'>
          Comenta otras publicaciones
        </p>
        <p className='text-lg text-gray-700'>
          Entre todos podemos ayudarnos a salir del pozo, pero recuerda que probablemente ni tú ni
          quién te comente sea un profesional de la salud mental. Es una comunidad de apoyo, pero si
          necesitas ayuda profesional no la busques aquí
        </p>
        <Image
          src='/assets/images/purr-5.png'
          width={350}
          height={350}
          alt='a cat comforting another one'
        />
      </div>
      <div className='md:hidden h-screen flex flex-col items-center justify-center gap-6 px-6 text-center'>
        <p className='text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-500'>
          Pórtate bien
        </p>
        <p className='text-lg text-gray-700 dark:text-primary'>
          A veces, solo necesitamos desahogarnos. Puedes hacerlo de forma anónima o crear una
          cuenta, así podrás seguir el hilo de lo que ocurre. Otras personas pueden darte consejos o
          apoyo
        </p>
        <Image
          src='/assets/images/purr-monch.png'
          width={350}
          height={350}
          alt='a cat chewing on a plant'
        />
      </div>
    </>
  );
}

export default HeroSection;
