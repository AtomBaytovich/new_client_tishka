import style from "./style.module.scss"

export const Button = ({ children, backgroundColor = "#FFF" }) => {
    return (
        <div style={{ backgroundColor }} className={style.button}>
            {children}
        </div>
    )
}