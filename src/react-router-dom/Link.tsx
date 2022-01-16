import React, { lazy, useContext, useEffect } from 'react';
import { Context } from './Router';

interface IProps {
  to: string;
  children: any;
}

const lazyView = (name: string) => lazy(() => {
   return import(`../route/${name}`)
})

const Link: React.FC<IProps> = (props: IProps) => {
  const context = useContext<any>(Context);
  const { to } = props;
  function onClick() {
    console.log(context)
    context.history.push(to);
  }
  return (
    <a onClick={onClick}>{props.children}</a>
  )
} 

export default Link;