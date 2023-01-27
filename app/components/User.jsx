import React, {useEffect, useState, useRef} from 'react';
import {useSession} from 'next-auth/react';
import UserContext from '../../lib/userContext';

const User = ({children}) => {
  const {data: session} = useSession();
  const [user, setUser] = useState([]);
  const initialMount = useRef(true);

  useEffect(() => {
    // to stop useEffect from rendering at the mounting of the app
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      if (session) {
        fetch(`http://localhost:3000/api/getUser/${session?.user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data[0]);
          });
      }
    }
  }, [session]);

  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
};

export default User;
