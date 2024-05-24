import classes from './menubar.module.css';
import Stop from './stop';
import Precent from './percentage';
import Level from './level';
import Countdown from './countdown';

function Menubar() {
    return (
    <div className={classes.top}>
        <Stop></Stop>

        <div className={classes.change}>
            <div className={classes.progress}>
                <Precent></Precent>
            </div>
            <Level></Level>
            <Countdown></Countdown>
        </div>
    </div>
    )
}

export default Menubar