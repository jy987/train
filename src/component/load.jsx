import classes from './load.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
import { QuizContext } from './store/QuizContext';

const Load = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);
    const { setQuizData,setTimer } = useContext(QuizContext)
    const time = 0
    const percentage = 0
    const topic = 0
    const answer = []
    setQuizData(percentage,topic,answer)
    setTimer(time)
    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }else if(count === 0){
            navigate('/quiz')
        }
    },[count]);
    return (
        <div className={classes.load}>
            <div className={classes.loadBgc}>
                <div className={classes.loadmain}>
                    <div className={classes.count}><b>{count}</b></div>
                    <span className={classes.preparation}>准备中...</span>
                </div>
            </div>
        </div>
    )
}

export default Load