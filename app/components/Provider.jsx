'use client';
import {ThemeProvider} from 'next-themes';
import {SessionProvider} from 'next-auth/react';
import User from './User';

export default function Provider({children, ...props}) {
  return (
    <ThemeProvider attribute='class' enableSystem={false}>
      <SessionProvider session={props.session}>
        <User>{children}</User>
      </SessionProvider>
    </ThemeProvider>
  );
}
