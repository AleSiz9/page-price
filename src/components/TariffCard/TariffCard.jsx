import cn from 'classnames';
import s from "./t.module.css"

export const TariffCard = (props) => {
    const {
        id,
        price,
        ref,
        fullPrice,
        period,
        hit,
        discount,
        className,
        children,
        isExpir,
        isSeparate = false,
        tabIndex
    } = props

    return (
        <div className={className} ref={ref} tabIndex={tabIndex}>
            <div className={`${isSeparate ? s.tCard__discountBadge : s.tariffCard__discountBadge}`}>
                <span className={`${isSeparate ? s.tCard__discound : s.tariffCard__discount}`}
                >
                    {discount} %
                </span>
                <span className={`${isSeparate ? s.tCard__discountHit : s.tariffCard__discountHit}`}
                >
                    {hit}
                </span>
            </div>
            <div className={`${isSeparate ? s.tCard__inner : s.tariffCard__inner}`} id={id}>
                <div className={`${isSeparate ? s.tCard__content : s.tariffCard__content}`}>
                    <div className={`${isSeparate ? s.tCard__price : s.tariffCard__price}`}>
                        <p className={`${isSeparate ? s.tCard__period : s.tariffCard__period}`}
                        >
                            {period}
                        </p>
                        {!isExpir ? (
                            <>
                                <p className={`${isSeparate ? s.tCard__priceCurrent : s.tariffCard__priceCurrent}`}>
                                    {price} ₽
                                </p>
                                <p className={cn({
                                    [s.tCard__priceFull]: isSeparate,
                                    [s.tariffCard__priceFull]: !isSeparate,
                                })}>
                                    <s>{fullPrice} ₽</s>
                                </p>
                            </>
                        ) : (
                            <p className={cn({
                                [s.tCard__priceFullFinal]: isExpir
                            })}>{fullPrice} ₽</p>
                        )}
                    </div>
                    <p className={`${isSeparate ? s.tCard__discription : s.tariffCard__discription}`}
                    >
                        {children}
                    </p>
                </div>
            </div>
        </div>
    )
}

