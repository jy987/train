import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [timer, setTimer] = useState(20)
    const [quizData, setQuizData] = useState({
        color: '',
        word: '',
        correctWord: '',
        wrongWord: '',
        results: '',
        answer: [],
        topic: 1,
        percentage: 0,
        options: [],
        firstOptionBtn: '',
        secondOptionBtn: '',
    });

    return (
        <QuizContext.Provider value={{ timer,setTimer,quizData, setQuizData }}>
            {children}
        </QuizContext.Provider>
    );
};
