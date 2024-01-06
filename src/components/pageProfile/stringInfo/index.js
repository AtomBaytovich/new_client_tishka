import style from "./style.module.scss";

export const StringInfo = ({ srcImg, title, text, altImg = "Картинка из немо", styles }) => {
    return (
        <div className={`${style.string}`} style={styles}>
            <div className={style.group}>
                {srcImg && <img src={srcImg} alt={altImg} />}
                <p>{title}</p>
            </div>
            <p className={style.text}>{text}</p>
        </div>
    )
}