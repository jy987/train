import classes from './pausing.module.css'
import { useNavigate } from 'react-router-dom'

const Pausing = () => {
    const navigate = useNavigate()
    function handleContinue(){
      navigate('/quiz')
    }
    function handleCheck(){
        navigate('/rule')
    }
    function handleExit(){
        navigate('/')
    }
    
    return (
        <div className={classes.pausing}>
            <div className={classes.pausingBgc}>
                <div className={classes.menu}>
                    <p className={classes.menuTitle}>菜单</p>
                    <div className={classes.menuMain}>
                        <button className={classes.continue} onClick={handleContinue}>继续训练</button>
                        <button className={classes.check} onClick={handleCheck}>查看规则</button>
                        <button className={classes.help}>训练帮助</button>
                        <button className={classes.exit} onClick={handleExit}>退出训练</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pausing