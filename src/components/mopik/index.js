import { useState } from "react";
import style from "./style.module.scss";
import { WriteCommentAndViews } from "./social";

export const Mopik = ({ id, title, text, countLikes, countComment, countView }) => {
    const [nextView, setNextView] = useState(false)
    return (
        <div className={style.mopik} id={id}>
            <div className={style.data}>
                <div className={style.written}>
                    <p className={style.title}>{title}</p>
                    <p className={style.text}>{text}</p>
                    <p className={style.next} onClick={() => setNextView(!nextView)}>Смотреть далее</p>
                </div>
                {nextView ? (
                    <WriteCommentAndViews />
                ) : undefined}
            </div>
            <div className={style.meta}>
                <div className={style.like}>
                    <img src="./assets/smiles/mopik/like.png" alt="Сердечко" />
                </div>
                <div className={style.comment} onClick={() => setNextView(!nextView)}>
                    <img src="./assets/smiles/mopik/message.png" alt="Конвертик" />
                </div>
                <div className={style.views}>{countView}</div>
            </div>
        </div>
    )
}