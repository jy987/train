import classes from './inlet.module.css'
import play from '../image/continue.png'
import exit from '../image/exit.png'
import { useNavigate } from 'react-router-dom';

const Inlet = () => {
    const navigate = useNavigate(); //页面跳转
    function handleClick(){
        navigate('/rule');
    }
    
    return (
        <div className={classes.inlet}>
            <div className={classes.inletTitle}>
                <p>色词训练</p>
            </div>
            <div className={classes.inletBtn}>
                <div className={classes.play} onClick={handleClick}>
                    <img src={play} alt="" />
                    <button><b>开始</b></button>
                </div>
                <div className={classes.exit}>
                    <img src={exit} alt="" />
                    <button><b>退出</b></button>
                </div>
            </div>
        </div>
    )
}

export default Inlet