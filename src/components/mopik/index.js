import { useState } from "react";
import style from "./style.module.scss";
import { WriteCommentAndViews } from "./social";
import { BlockAvatar } from "../blockAvatar";

export const Mopik = ({ id, title, text, countLikes, countComment, countView }) => {
    const [nextView, setNextView] = useState(false)
    const [tapCount, setTapCount] = useState(0);
    const [idTimeout, setIdTimeout] = useState(undefined)

    const handleTap = () => {
        // Увеличиваем счетчик тапов на 1
        setTapCount(tapCount + 1);
        if (tapCount < 1) {
            let id = setTimeout(() => {
                setTapCount(0);
            }, 800);
            setIdTimeout(id)
        }

        // Если пользователь нажал дважды, совершаем действие
        if (tapCount >= 1) {
            // Выполняем необходимое действие
            setNextView(!nextView)
            // Сбрасываем счетчик тапов
            clearTimeout(idTimeout)
            return setTapCount(0);
        }
    };

    const getMi = () => {
        if (nextView) return;
        setNextView(true)
    }

    return (
        <div className={style.mopik} id={id}>
            <div className={style.data} style={nextView ? { borderRadius: "10px 0px 0px 10px" } : null}>
                <div className={style.written} onClick={() => handleTap()}>
                    <p className={style.title}>{title}</p>
                    <p className={style.text}>{text}</p>
                </div>
                {nextView ? (
                    <div className={style.social}>
                        <BlockAvatar />
                        <WriteCommentAndViews/>
                    </div>
                ) : undefined}
            </div>
            {nextView ? (
                <div className={style.meta}>
                    <div className={style.like}>
                        <img src="./assets/smiles/mopik/like.png" alt="Сердечко" />
                    </div>
                    {/* <div className={style.comment} onClick={() => setNextView(!nextView)}>
                    <img src="./assets/smiles/mopik/message.png" alt="Конвертик" />
                    </div> */}
                    <div className={style.views}>{countView}</div>
                </div>
            ) : undefined}
        </div>
    )
}