import { LikeEmoji } from "../assets/emoji/like";
import style from "./style.module.scss";

export const Mopik = ({ id, title, text, countLikes, countComment, countView }) => {
    return (
        <div className={style.mopik} id={id}>
            <div className={style.data}>
                <div className={style.written}>
                    <p className={style.title}>{title}</p>
                    <p className={style.text}>{text}</p>
                </div>
            </div>
            <div className={style.meta}>
                <div className={style.like}>
                    <img src="./assets/smiles/mopik/like.png" alt="Сердечко" />
                </div>

                <div className={style.comment}>
                    <img src="./assets/smiles/mopik/message.png" alt="Конвертик" />
                </div>

                <div className={style.views}>467</div>
            </div>
        </div>
    )
}