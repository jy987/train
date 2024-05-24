import classes from './countdown.module.css';
import countdownimg from '../../image/countdown.png';
import { QuizContext } from '../store/QuizContext';
import { useContext } from 'react';

function Countdown(){
  const { timer } = useContext(QuizContext)
  return (
    <div className={classes.countdown}>
        <img alt='' src={countdownimg} className={`${classes.timer} ${timer <= 3 ? classes.pulse : ''}`}></img>
        <span>{timer ? timer : 0}s</span>
    </div>
  )
}

export default Countdown