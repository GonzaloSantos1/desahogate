import React, {useEffect, useState, useRef} from 'react';
import {useSession} from 'next-auth/react';
import UserContext from '../../lib/userContext';

const User = ({children}) => {
  const {data: session} = useSession();
  const [user, setUser] = useState([]);
  const initialMount = useRef(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // to stop useEffect from rendering at the mounting of the app
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      if (session) {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/getUser/${session?.user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data[0]);
          });
      }
    }
  }, [session]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/getPosts`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return <UserContext.Provider value={{user, data}}>{children}</UserContext.Provider>;
};

export default User;
