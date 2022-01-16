import React, { useContext, useEffect } from 'react';
import { Context } from './Router';
import PathToRegExp from 'path-to-regexp'

interface IProps {
  children: any;
}

const Switch: React.FC<IProps>= (props: IProps) => {
  const context = useContext<any>(Context);
  const children = props.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const path = child.props.path || '';
    const reg = PathToRegExp(path, [], {end: false});
    if (reg.test(context.location)) {
      return child;
    }
  }
  return null;
} 
export default Switch;