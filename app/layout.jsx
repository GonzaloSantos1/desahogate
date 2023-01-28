'use client';
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';
import React, {Suspense} from 'react';
import Loading from './loading';
import {SessionProvider} from 'next-auth/react';
import User from './components/User';

export default function RootLayout({children, ...props}) {
  const user = 'usuarito';
  return (
    <html lang='en'>
      <head />
      <body className='bg-[#000000] text-primary h-screen overflow-hidden flex flex-col relative'>
        <SessionProvider session={props.session}>
          <User>
            <Header />
            <Suspense fallback={<Loading />}>
              <div id='body-div' className='flex-1 overflow-y-scroll relative'>
                {children}
              </div>
            </Suspense>
            <Footer />
          </User>
        </SessionProvider>
      </body>
    </html>
  );
}
