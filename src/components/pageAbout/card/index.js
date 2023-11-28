import style from "./style.module.scss"

export const Card = ({ children, backgroundColor = "#383752", width, height }) => {
    return (
        <div className={style.card} style={{ backgroundColor, width, height }}>{children}</div>
    )
}