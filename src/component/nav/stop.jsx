import React from "react";
import classes from './stop.module.css';
import timeout from '../../image/time-out.png';
import { useNavigate  } from 'react-router-dom';

function Stop(){
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/pausing');
  }
  return (
    <div className={classes.stop} onClick={handleClick}>
        <img alt="" src={timeout}></img>
        <span>暂停</span>
    </div>
  )
}

export default Stop;
