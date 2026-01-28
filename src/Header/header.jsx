import { TariffTimer } from "../components/TariffTimer/TariffTimer"
import { useTimer } from "../context/useTimer"
import s from "./t.module.css"

export const Header = () => {
const { expiredTimer } = useTimer()
const handleTimerComplete = () => {
    expiredTimer()
}

    return(
        <header className={s.header}>
        <TariffTimer onComplete={handleTimerComplete} date={Date.now() + 120000}>
        </TariffTimer>
        </header>
    )
} 