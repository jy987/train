import { Flex, Progress } from 'antd';
import './percentage.css';
import { useContext } from 'react';
import { QuizContext } from '../store/QuizContext';

const Precent = () => {
  const { quizData } = useContext(QuizContext)
  return (
    <Flex
      vertical
      gap="small"
      style={{
        width: '500rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height:'maxContent'
      }}
    >
      <span className='complete'>完成进度</span>
      <Progress percent={quizData.percentage ? quizData.percentage : 0} size={[300, 20]} showInfo = {false}/>
    </Flex>
)};
export default Precent;