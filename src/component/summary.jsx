import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './summary.module.css'
import { QuizContext } from './store/QuizContext';

const Summary = () => {
    const { quizData } = useContext(QuizContext)
    const [encouragement,setEncouragement] = useState('太棒了')
    const navigate = useNavigate();
    const [summaryData, setSummaryData] = useState([]);
    const [animateEncouragement, setAnimateEncouragement] = useState(false);

    useEffect(() => {
        const storedAnswers = JSON.parse(quizData.answer) || [];
        setSummaryData(storedAnswers);

        storedAnswers.forEach(element => {
            console.log(element);
            if (element.results === 'Wrong' || element.results === 'skipped') {
                setEncouragement('再接再厉')
            }
        });
        setAnimateEncouragement(true);
    }, []);

    const correctCount = summaryData.filter(answer => answer.results === 'Correct').length;
    const skippedCount = summaryData.filter(answer => answer.results === 'skipped').length;
    const totalQuestions = summaryData.length;
    const averageTime = summaryData.reduce((acc, answer) => acc + answer.ansTime, 0) / totalQuestions;
    const accuracy = (correctCount / totalQuestions) * 100;

    const translateResult = (result) => {
        switch(result) {
            case 'Correct':
                return '正确';
            case 'Wrong':
                return '错误';
            case 'skipped':
                return '漏答';
            default:
                return result;
        }
    };


    return (
        <div className={classes.summary}>
            <div className={classes.summaryBody}>
                <div className={classes.summaryContainer}>
                <h1>已完成色词训练</h1>
                <div className={classes.summaryStats}>
                    <p>正确率: {accuracy.toFixed(2)}%</p>
                    <p>平均用时: {averageTime.toFixed(2)}秒</p>
                    <p>漏答题数: {skippedCount}</p>
                </div>
                <div className={`${classes.encouragement} ${animateEncouragement ? classes.animate : ''}`}>{encouragement}</div>
                <div className={classes.summaryTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>题号</th>
                                {summaryData.map((_, index) => (
                                    <th key={index}>{index + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>成绩</td>
                                {summaryData.map((answer, index) => (
                            
                                    <td key={index}>{translateResult(answer.results)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>用时</td>
                                {summaryData.map((answer, index) => (
                                    <td key={index}>{answer.ansTime}s</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.summaryButtons}>
                    <button onClick={() => navigate('/load')}>再来一次</button>
                    <button onClick={() => navigate('/')}>完成训练</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Summary;
