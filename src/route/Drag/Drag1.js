import React, {useState, useLayoutEffect} from 'react';
import * as styles from './Drag.module.scss';
import { whileStatement } from '../../../node_modules/@babel/types';

const  Drag = (props) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [select, setSelect] = useState();
  let a = 0;
  let b = 0;

  useLayoutEffect(() => {
   
    return () => {
    };
  }, []);

  function onDragStart (e) {
    setSelect(e.target);
  }
  
  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (isBefore(select, e.target)) {
      e.target.parentNode.insertBefore(select, e.target)
    } else {
      e.target.parentNode.insertBefore(select, e.target.nextSibling)
    }
  }

  function isBefore (e1, e2) {
    let cur;
    if (e1.parentNode === e2.parentNode) {
      cur = e1.previousSibling;
      while(cur) {
        if (cur === e2) {
          return true;
        }
        cur = e1.nextSibling;
      }
      return false;
    }
  }

  function onDragEnd(e) {
    setSelect(null)
  }
  return (
    <div className={styles.container}>
      <div draggable="true" 
        className={styles.div} 
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>1</div>
      <div draggable="true" 
        className={styles.div} 
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>2</div>
    </div>
  )
}

export default Drag;