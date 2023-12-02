import { useState } from "react";
import style from "./style.module.scss";
import { WriteCommentAndViews } from "./social";

export const Mopik = ({ id, title, text, countLikes, countComment, countView }) => {
    const [nextView, setNextView] = useState(false)
    const [tapCount, setTapCount] = useState(0);

    const handleTap = () => {
        // Увеличиваем счетчик тапов на 1
        setTapCount((tapCount) => tapCount + 1);
        let id;
        if (tapCount < 1) {
            let id = setTimeout(() => {
                setTapCount(0);
            }, 1000);
            console.log(id)
        }

        // Если пользователь нажал дважды, совершаем действие
        if (tapCount >= 1) {
            // Выполняем необходимое действие
            console.log('Действие выполнено!');
            setNextView(!nextView)
            // Сбрасываем счетчик тапов
            clearTimeout(id)
            return setTapCount((tapCount) => tapCount = 0);
        }

    };

    const getMi = () => {
        if (nextView) return;
        setNextView(true)
    }

    return (
        <div className={style.mopik} id={id}>
            <div className={style.data}>
                <div className={style.written} onClick={() => handleTap()}>
                    <p className={style.title}>{title}</p>
                    <p className={style.text}>{text}</p>

                    {/* {
                        nextView
                            ?
                            <p className={style.next} onClick={() => setNextView(false)}>Скрыть</p>
                            :
                            undefined
                    } */}

                    {/* <p className={style.next} onClick={() => setNextView(!nextView)}>Смотреть далее</p> */}
                </div>
                {nextView ? (<>
                    <WriteCommentAndViews />
                </>
                ) : undefined}
            </div>

            {/* <div className={style.meta}>
                <div className={style.like}>
                    <img src="./assets/smiles/mopik/like.png" alt="Сердечко" />
                </div>
                <div className={style.comment} onClick={() => setNextView(!nextView)}>
                    <img src="./assets/smiles/mopik/message.png" alt="Конвертик" />
                </div>
                <div className={style.views}>{countView}</div>
            </div> */}
        </div>
    )
}