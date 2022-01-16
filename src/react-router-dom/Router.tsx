import React,  { useState, useEffect } from 'react';

interface IProps {}

export const Context = React.createContext({});

const Router: React.FC<IProps> = (props) => {
  const [location, setLocation] = useState<any>({
    path: ''
  });

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandle)
    return () => {
      window.removeEventListener('hashchange', hashChangeHandle)
    };
  }, []);

  function hashChangeHandle () {
    console.log('hash',window.location.hash.slice(1));
    setLocation(window.location.hash.slice(1))
  }
  
  return (
    <Context.Provider value={{
      location: location,
      history: {
        push: (to: string) => {
          window.location.hash = to;
        }
      }
    }}>
      {props.children}
    </Context.Provider>
  )
}

export default Router;