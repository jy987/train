import classes from './level.module.css';
import levelimg from '../../image/level.png'

function level(){
  return (
    <div className={classes.level}>
        <img alt='' src={levelimg}></img>
        <span>等级1</span>
    </div>
  )
}

export default level