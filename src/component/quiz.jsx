import React, { useState, useEffect, useContext } from 'react';
import classes from './quiz.module.css';
import Menubar from './nav/menubar';
import { useNavigate } from 'react-router-dom';
import yes from '../image/yes.png';
import error from '../image/error.png'
import { QuizContext } from './store/QuizContext';

const Quiz = () => {
    const { quizData, setQuizData, timer, setTimer } = useContext(QuizContext)
    const parseJSON = (value, defaultValue) => {
        try {
            return JSON.parse(value) || defaultValue;
        } catch {
            return defaultValue;
        }
    };
    const [time, setTime] = useState(() => parseInt(timer) || 20); //计时器
    const [color, setColor] = useState(() => quizData.color || ''); //字的颜色
    const [word, setWord] = useState(() => quizData.word || ''); //单词
    const [correctWord, setCorrectWord] = useState(() => quizData.correctWord || ''); //正确答案
    const [wrongWord, setWrongWord] = useState(() => quizData.wrongWord || ''); //错误答案
    const [results, setResults] = useState(() => quizData.results || ''); //答题状态
    const [answer, setAnswer] = useState(() => parseJSON(quizData.answer, [])); // 记录每题的答题情况
    const [topic, setTopic] = useState(() => parseInt(quizData.topic) || 1); //题目数量
    const [percentage, setPercentage] = useState(() => parseInt(quizData.percentage) || 0); //完成进度
    const [options, setOptions] = useState(() => parseJSON(quizData.options, []));
    const [firstOptionBtn, setFirstOptionBtn] = useState(() => quizData.firstOptionBtn || '');
    const [secondOptionBtn, setSecondOptionBtn] = useState(() => quizData.secondOptionBtn || '');
    const [recognizing, setRecognizing] = useState(false); // 语音识别状态
    const [speechResult, setSpeechResult] = useState(''); // 语音识别结果
    const navigate = useNavigate(); //页面跳转


    const changeData = () => {
        setQuizData({
            color,
            word,
            correctWord,
            wrongWord,
            results,
            answer: JSON.stringify(answer),
            topic,
            percentage,
            options: JSON.stringify(options),
            firstOptionBtn,
            secondOptionBtn,
        });
    }

    useEffect(() => {
        setTimer(time)
    }, [time])

    const colors = ['red', 'blue', 'black', 'green'];
    const words = ['红', '黑', '蓝', '绿'];
    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'zh-CN'; // 设置语言为中文
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setRecognizing(true);
        };

        recognition.onend = () => {
            setRecognizing(false);
        };
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    const result = event.results[i][0].transcript;
                    setSpeechResult(result);
                    if (result.includes(correctWord)) {
                        onClickFunction(correctWord);
                    } else if (result.includes(wrongWord)) {
                        onClickFunction(wrongWord);
                    } else {
                        setResults('Wrong');
                        setAnswer((prevAnswer) => [...prevAnswer, { topic, results: 'Wrong', ansTime: 20 - time }]);
                        setTimeout(() => {
                            nextQuestion();
                        }, 3000);
                    }
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            setSpeechResult(interimTranscript);
        };
    }

    const startRecognition = () => {
        if (recognition && !recognizing) {
            recognition.start();
        }
    };

    const stopRecognition = () => {
        if (recognition && recognizing) {
            recognition.stop();
        }
    };

    const game = () => {
        if (topic > 3) return; // 确保不生成第四道题
        // 随机生成字与颜色
        const randomIndexWord = Math.floor(Math.random() * words.length);
        const randomIndexColor = Math.floor(Math.random() * colors.length);

        const selectedWord = words[randomIndexWord];
        const selectedColor = colors[randomIndexColor];

        // 把随即色转化为中文
        let correctAnswer = '';
        switch (selectedColor) {
            case 'red':
                correctAnswer = '红';
                break;
            case 'blue':
                correctAnswer = '蓝';
                break;
            case 'black':
                correctAnswer = '黑';
                break;
            case 'green':
                correctAnswer = '绿';
                break;
            default:
                break;
        }

        // 设置错误答案，并保证正确与错误答案不同
        let randomWrongIndex;
        do {
            randomWrongIndex = Math.floor(Math.random() * words.length);
        } while (words[randomWrongIndex] === correctAnswer);

        const wrongAnswer = words[randomWrongIndex];
        const newOptions = [correctAnswer, wrongAnswer].sort(() => Math.random() - 0.5);

        setWord(selectedWord);
        setColor(selectedColor);
        setCorrectWord(correctAnswer);
        setWrongWord(wrongAnswer);
        setOptions(newOptions);
        setFirstOptionBtn(newOptions[0]);
        setSecondOptionBtn(newOptions[1]);
    };

    const nextQuestion = (skipped = false) => {
        const newTopic = topic + 1
        setTopic(newTopic);
        setPercentage((topic / 3) * 100);

        if (skipped) {
            console.log('setResults');
            setResults('skipped')
            setAnswer((prevAnswer) => [...prevAnswer, { topic, results: 'skipped', ansTime: 0 }]);
            if (newTopic > 3) {
                // setAnswer((prevAnswer) => [...prevAnswer, { topic, results: 'skipped', ansTime: 0 }]);
                setTimeout(() => {
                    console.log(answer);
                    navigate('/summary', { replace: true });
                }, 1000)
            } else {
                game();
                setTimer(20)
                setTime(20)
            }

        } else {
            if (newTopic > 3) {
                console.log(answer);
                navigate('/summary', { replace: true });
            } else {
                game();
                setTimer(20)
                setTime(20)
            }

        }


    };

    const onClickFunction = (chosenAnswer) => {
        setSpeechResult('');
        console.log(results)
        const ansTime = 20 - time;
        const isCorrect = chosenAnswer === correctWord;
        setResults(isCorrect ? 'Correct' : 'Wrong');
        setAnswer((prevAnswer) => {
            const newAnswers = [...prevAnswer];
            newAnswers[topic - 1] = { topic, results: isCorrect ? 'Correct' : 'Wrong', ansTime };
            return newAnswers;
        });
        setQuizData('results', isCorrect ? 'Correct' : 'Wrong');
    };

    useEffect(() => {
        if (time === 20) {
            game();
        }
    }, []);


    useEffect(() => {
        console.log('我在线了', topic);
        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(interval);
                    nextQuestion(true); // 倒计时结束时记为漏答
                    return 20;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [topic]); // 当 topic 改变时重新设置倒计时


    useEffect(() => {
        console.log(results)
        changeData()
        if (results === 'Correct' || results === 'Wrong') {
            const timeout = setTimeout(() => {
                setResults('')
                nextQuestion()
                
            }, 2000)
            return () => clearInterval(timeout);
        }
        else if (results === 'skipped') {
            setResults('')
        }
    }, [results])


    return (
        <div className={classes.quiz}>
            <div className={classes.quizBgc}>
                <Menubar/>

                {results === 'Correct' || results === 'Wrong' ?
                    <div>{results === 'Correct' ? <div>
                        <div className={classes.correct}>
                            <img alt='' src={yes}></img>
                            <span><b>答对啦</b></span>
                        </div>
                    </div> :
                        <div>
                            <div className={classes.correct}>
                                <img alt='' src={error}></img>
                                <span><b>答错啦</b></span>
                            </div>
                        </div>}</div> :
                    <div className={classes.quizmain}>
                        <div className={classes.skip}><button onClick={() => nextQuestion(true)}>跳过</button></div>
                        <div className={classes.gamemain}>
                            <div className={classes.randomword} style={{ color: color }}>{word}</div>
                            <div className={classes.choose} >
                                <button onClick={() => { onClickFunction(firstOptionBtn) }} className={classes.firstOptionBtn}>{firstOptionBtn}</button>
                                <button onClick={() => { onClickFunction(secondOptionBtn) }} className={classes.secondOptionBtn}>{secondOptionBtn}</button>
                            </div>
                        </div>
                        <div className={classes.recognition}>
                            <div className={classes.speechResult}>识别结果: {speechResult}</div>
                            <div className={classes.recognitionBtn}>
                                <button onClick={startRecognition} disabled={recognizing}>开始</button>
                                <button onClick={stopRecognition} disabled={!recognizing}>停止</button>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Quiz