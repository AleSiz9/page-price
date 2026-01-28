import { useState } from "react"
import s from "./t.module.css"

const TariffCardCheckButton = () => {
    const [isChecked, setIsChecked] = useState(false)
    const [isError, setIsError] = useState(false)
    const handleCheckbox = (e) => {
        setIsChecked(e.target.checked)
        setIsError(false)
    }
    const handleClick = () => {

        if (!isChecked) {
            setIsError(true)
            return
        }
    }

    return (
        <div className={s.tariffCardChech}>
            <div className={`${s.tariffCardCheck__agrement} ${isError ? s.error : ''}`}>
                <input
                    id="checkbox"
                    className={s.tariffCardCheck__input}
                    type="checkbox"
                    onChange={handleCheckbox}
                    checked={isChecked}
                    aria-label="Согласен с офертой и политикой конфиденциальности"
                    aria-describedby="agreement-text"
                    aria-invalid={isError}
                />
                <label
                    className={s.tariffCardCheck__label}
                    htmlFor="checkbox">
                    <span className={s.tariffCardCheck__inputCheckBox}>
                    </span>
                </label>
                <p className={s.tariffCardCheck__agrementText} id="agreement-text">
                    Я согласен с
                    <a href="##"> офертой рекуррентных платежей </a>
                    и
                    <a href="##"> Политикой конфиденциальности</a>
                </p>
            </div>
            <button onClick={handleClick} className={s.tariffCardChech__button}>Купить</button>
            <p className={s.tariffCardChech__text}>
                Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению.
                Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>
        </div>
    )
}

export default TariffCardCheckButton