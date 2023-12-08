import style from "./style.module.scss";

export const StringInfo = ({ srcImg, title, text, altImg = "Картинка из немо" }) => {
    return (
        <div className={`${style.string}`}>
            <div className={style.group}>
                {srcImg && <img src={srcImg} alt={altImg} />}
                <p>{title}</p>
            </div>
            <p className={style.text}>{text}</p>
        </div>
    )
}