import React, {useState, useLayoutEffect} from 'react';
import * as styles from './Drag.module.scss';

const  Drag = (props) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  let a = 0;
  let b = 0;

  useLayoutEffect(() => {
    function onMouseDown (e) {
      console.log(e.clientX, e.clientY, e.target.getBoundingClientRect())
      setStartX(e.clientX - e.target.getBoundingClientRect().left);
      setStartY(e.clientY- e.target.getBoundingClientRect().top);
      // a = e.clientX - e.target.getBoundingClientRect().left
      // b = e.clientY- e.target.getBoundingClientRect().top
      document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseMove (e) {
      console.log(e.clientX, startX, a, b)
      setX(e.clientX - startX);
      setY(e.clientY - startY);
      // setX(e.clientX - a);
      // setY(e.clientY - b)
    }

    function onMouseUp(e) {
      document.removeEventListener('mousemove', onMouseMove);
    }

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.div} style={{left: `${x}px`, top: `${y}px`}}></div>
    </div>
  )
}

export default Drag;