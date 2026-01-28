import { useState } from "react"
import Countdown, { zeroPad } from "react-countdown"
import s from './t.module.css'

export const TariffTimer = ({ date, children, triger = 30, onTriger, onComplete }) => {
    const [isTriger, setIsTriger] = useState(false)
    const [timer, setTimer] = useState(false)

    const handleTick = ({ total, completed }) => {
        const totalSeconds = Math.floor(total / 1000);
        if (completed) {
            setIsTriger(false)
            setTimer(true)
        } else if (totalSeconds <= triger && !isTriger) {
            setIsTriger(true)
            if (onTriger) {
                onTriger(totalSeconds)
            }
        }
    }
    const handleComplete = () => {
        setTimer(true)
        if (onComplete){
            onComplete()
        }
    }
    const renderer = ({ minutes, seconds, completed }) => {
        const timeDisplay = timer || completed ? '00:00' : `${zeroPad(minutes)}:${zeroPad(seconds)}`
        return (
            <div className={s.timerDisplay}>
                <p>Успейте открыть пробную неделю</p>

                <div className={`${s.timerDigits} ${isTriger ? s.pulse : ''}`}
                >
                    <span className={s.timerDigits__star}>✦</span>
                    <span>{timeDisplay}</span>
                    <span className={s.timerDigits__star}>✦</span>
                </div>
            </div>
        )
    }

    return (
        <Countdown
            onComplete={handleComplete}
            onTick={handleTick}
            renderer={renderer}
            date={date}
        >
            {children}
        </Countdown>

    )
}