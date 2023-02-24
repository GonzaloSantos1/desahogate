'use client';
import Header from './components/Header';
import './globals.css';
import React, {Suspense} from 'react';
import Loading from './loading';
import {SessionProvider} from 'next-auth/react';
import User from './components/User';

export default function RootLayout({children, ...props}) {
  return (
    <html lang='en'>
      <head />
      <SessionProvider session={props.session}>
        <body className='bg-palette-black text-primary relative overflow-x-hidden'>
          <User>
            <Header />
            <Suspense fallback={<Loading />}>
              <div id='body-div' className='flex-1 scrollbar-none relative md:pb-0'>
                {children}
              </div>
            </Suspense>
          </User>
        </body>
      </SessionProvider>
    </html>
  );
}
