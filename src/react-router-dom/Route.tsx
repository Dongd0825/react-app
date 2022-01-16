import React, { lazy, useContext, useEffect } from 'react';
import { Context } from './Router';
import PathToRegExp from 'path-to-regexp'

interface IProps {
  path: string;
  component: any;
  exact?: boolean;
}

const lazyView = (name: string) => lazy(() => {
   return import(`../route/${name}`)
})

const Route: React.FC<IProps> = (props: IProps) => {
  const context = useContext<any>(Context);
  const { path, component: Component, exact = false } = props;
  const regPath = PathToRegExp(path, [], {end: false});
  
  return (<>{
    regPath.test(context.location)
      ? Component()
      : null
  }</>)
} 

export default Route;