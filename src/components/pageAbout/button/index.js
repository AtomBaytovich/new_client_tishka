import style from "./style.module.scss"

export const Button = ({ children, backgroundColor = "#FFF", styles = {} }) => {
    return (
        <div style={{ backgroundColor, ...styles }} className={`${style.button}`}>
            {children}
        </div>
    )
}