import { useEffect, useRef, useState } from "react"
import { fetchTarifs } from "../../servise/api"
import { TariffCard } from "../TariffCard/TariffCard"
import { useTimer } from "../../context/useTimer"
import s from './t.module.css'

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = (e) => setMatches(e.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
}

const TariffList = () => {
    const [tariffs, setTariffs] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const cardRef = useRef(null)
    const isMobile = useMediaQuery('(max-width: 720px)');
    const { isExpired } = useTimer()
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const tariffsData = await fetchTarifs()
                setTariffs(tariffsData)
                setError('')
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (tariffs.length > 0) {
            cardRef.current?.focus()
        }
    }, [tariffs])

    if (loading) {
        return (
            <div className={s.loading}></div>
        )
    }

    return (
        <div className={s.tariffList}>
            {tariffs.map((e, index) => {
                if (index === 3) {
                    return (
                        <TariffCard
                            tabIndex={0}
                            key={`${e.id}-${index}`}
                            price={e.price}
                            id={e.id}
                            discount={Math.round(((e.full_price - e.price) / e.full_price) * 100)}
                            hit={e.is_best ? 'хит!' : ''}
                            fullPrice={e.full_price}
                            className={`${s.tCard}`}
                            period={e.period}
                            isExpir={isExpired}
                            isSeparate={true}
                            ref={index === 3 ? cardRef : null}
                        >
                            {isMobile ? "Всегда быть в форме" : e.text}
                        </TariffCard>
                    );
                }
                return (
                    <TariffCard
                        tabIndex={0}
                        key={`${e.id}-${index}`}
                        price={e.price}
                        id={e.id}
                        discount={Math.round(((e.full_price - e.price) / e.full_price) * 100)}
                        hit={e.is_best ? 'хит!' : ''}
                        fullPrice={e.full_price}
                        className={`${s.tariffCard} ${e.is_best ? s.active : ''}`}
                        period={e.period}
                        error={error}
                        loading={loading}
                        isExpir={isExpired}
                        ref={index === 0 ? cardRef : null}
                    >
                        {e.text}
                    </TariffCard>
                );
            })}
            <div className={s.tariffCard__hint}>
                <span className={s.tariffCard__hintIcon}>!</span>
                <p className={s.tariffCard__hintText}>
                    Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
                </p>
            </div>
        </div>
    );
}

export default TariffList