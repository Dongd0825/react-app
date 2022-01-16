import React, { lazy, useContext, useEffect } from 'react';
import { Context } from './Router';

interface IProps {
  to: string;
}

const lazyView = (name: string) => lazy(() => {
   return import(`../route/${name}`)
})

const Redirect: React.FC<IProps> = (props: IProps) => {
  const context = useContext<any>(Context);
  const { to } = props;
  context.history.push(to);
  return (<></>)
} 

export default Redirect;