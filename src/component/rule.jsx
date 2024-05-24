import classes from './rule.module.css';
import ruleimg from '../image/rules.png';
import backimg from '../image/back.png';
import nextimg from '../image/next.png';
import { useNavigate } from 'react-router-dom';

const Rule = () => {
    const navigate = useNavigate(); //页面跳转
    function handleBackClick() {
        console.log(123);
        navigate('/');
    }
    function handleNextClick() {
        console.log(456);
        navigate('/load');
    }
    return (
        <div className={classes.rule}>
            <div className={classes.ruleBgc}>
                <p className={classes.ruleTitle}>规则说明</p>
                <div className={classes.ruleBody}>
                    <div className={classes.back} onClick={handleBackClick}>
                        <img src={backimg} alt="" />
                    </div>
                    <div className={classes.ruleMain}>
                        <img src={ruleimg} alt="" />
                        <div className={classes.ruleExplain}>
                            <p className={classes.explainTitle}>详细介绍</p>
                            <p className={classes.explainMain}>说出字的颜色或点击对应的按钮</p>
                        </div>
                    </div>
                    <div className={classes.next} onClick={handleNextClick}>
                        <img src={nextimg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rule