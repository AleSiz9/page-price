import { createContext, useContext, useState } from "react";

const TimerContext = createContext()

export const TimerProvider = ({children}) => {
    const [isExpired, setIsExpired] = useState(false)
    const expiredTimer = () => {
        setIsExpired(true)
    }
    return(
        <TimerContext.Provider value={{isExpired, expiredTimer}}>
            {children}
        </TimerContext.Provider>
    )
}

export const useTimer = () => useContext(TimerContext)