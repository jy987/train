import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Rule from './component/rule';
import Load from './component/load';
import Quiz from './component/quiz';
import Pausing from './component/pausing';
import Summary from './component/summary';
import { QuizProvider } from './component/store/QuizContext';

document.documentElement.style.fontSize = 100/1528 + 'vw'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/rule",
    element:<Rule></Rule>
  },
  {
    path:'/load',
    element:<Load></Load>
  },
  {
    path:'/quiz',
    element:<Quiz></Quiz>
  },
  {
    path:'/pausing',
    element:<Pausing></Pausing>
  },
  {
    path:'/summary',
    element:<Summary></Summary>
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <QuizProvider>
      <RouterProvider router={router} />
  </QuizProvider>
);

