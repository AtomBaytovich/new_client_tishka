import style from "./style.module.scss"

export const Card = ({ children, backgroundColor = "#383752" }) => {
    return (
        <div className={style.card} style={{ backgroundColor }}>{children}</div>
    )
}