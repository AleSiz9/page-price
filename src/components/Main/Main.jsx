import TariffList from "../TariffList/TariffList"
import TariffCardCheckButton from "../ui/TariffCardCheckButton"
import mainImg from "../../image/mainImg.png"
import s from "./t.module.css"
export const Main = () => {
    return (
        <>
            <main className={s.main}>
                <h1 className={s.mainTitle}>
                    Выбери подходящий для себя
                    <span className={s.mainTitle__accent}> тариф</span>
                </h1>
                <div className={s.mainContent}>
                    <div className={s.mainContent__imgWrapper}>
                        <img
                            src={mainImg}
                            alt="Илюстрация спортивного человека"
                            className={s.mainContent__img}
                        />
                    </div>
                    <div className={s.mainContent__tariffs}>
                        <TariffList />
                        <TariffCardCheckButton />
                    </div>
                </div>
                <div className={s.mainContent__garantee}>
                    <p className={s.mainContent__garanteeBadge}>гарантия возврата 30 дней</p>
                    <p className={s.mainContent__garanteeText}>
                        Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели!
                        Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
                    </p>
                </div>
            </main>
        </>
    )
}

export default Main