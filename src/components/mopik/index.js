import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { WriteCommentAndViews } from "./social";
import { BlockAvatar } from "../blockAvatar";
import { getMopik, postCommentMopik, putLikeMopik } from "../../api/services/mopiks";

export const Mopik = ({ id, text }) => {
    const [nextView, setNextView] = useState(false)
    const [tapCount, setTapCount] = useState(0);
    const [idTimeout, setIdTimeout] = useState(undefined)
    const [data, setData] = useState({
        isLoading: true,
        mopik: {}
    })
    const textRef = useRef(null);

    const blockRef = useRef(null);

    const handleScroll = () => {
        const block = blockRef.current;
        if (block) {
            const blockTop = block.getBoundingClientRect().top;
            const blockBottom = block.getBoundingClientRect().bottom;
            // Проверяем, находится ли блок в области видимости окна просмотра
            if (blockTop < window.innerHeight && blockBottom >= 0) {
                // Блок видим, выполняем нужные действия
                if (blockRef.current?.isView == false) {
                    blockRef.current.isView = true;
                }
            }
        }
    };
    useEffect(() => {
        // Добавляем обработчик события прокрутки при монтировании компонента
        window.addEventListener('scroll', handleScroll);
        blockRef.current.isView = false;
        return () => {
            // Удаляем обработчик события прокрутки при размонтировании компонента
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            if (nextView == false) {
                setData((v) => ({
                    ...v,
                    isLoading: true
                }));
                getMopik({ _id: id })
                    .then(res => {
                        setData((v) => ({
                            ...v,
                            isLoading: false,
                            mopik: res.mopik
                        }));

                        console.log(res)
                    })
                    .catch(err => {
                        setData((v) => ({
                            ...v,
                            isLoading: false
                        }));
                        console.log(err)
                    })
            }
            // Сбрасываем счетчик тапов
            clearTimeout(idTimeout)
            return setTapCount(0);
        }
    };

    const putLike = () => {
        putLikeMopik({ _id: id })
            .then(res => {
                setData(v => ({
                    ...v,
                    mopik: {
                        ...v.mopik,
                        userLiked: res.data.userLiked
                    }
                }));
            })
            .catch(err => {
                console.log(err)
            })
    }

    const postComment = ({ v }) => {
        postCommentMopik({ _id: id, text: v })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const styles = {};

    if (nextView) {
        styles.width = "100%";

        if (data.isLoading) {
            styles.height = `${textRef.current.clientHeight + 36}px`;
        }

        if (!data.isLoading) {
            styles.borderRadius = "10px 0px 0px 10px";
        }
    }

    return (
        <div className={style.mopik} id={id} ref={blockRef}>
            <div className={style.data} style={styles}>

                <div className={style.written} onClick={() => handleTap()}>
                    {nextView && data.isLoading == false ? (
                        <p className={style.text}>{data.mopik.text}</p>
                    ) : <p className={`${style.text} ${(data.isLoading && nextView) && style.textLoading}`} ref={textRef}>{text}</p>}
                </div>

                {nextView && data.isLoading == false ? (
                    <>
                        <BlockAvatar name={data.mopik.ownerMopik.nickname.main} />
                        <div className={style.social}>
                            <WriteCommentAndViews onSubmit={(v) => postComment({ v })} />
                        </div>
                    </>
                ) : undefined}
            </div>
            {nextView && data.isLoading == false ? (
                <div className={style.meta}>
                    <div className={style.like}>
                        {data.mopik.userLiked ?
                            <img src="./assets/smiles/mopik/like.png" alt="Сердечко" onClick={() => putLike()} />
                            :
                            <img src="./assets/smiles/mopik/unlike.png" alt="Сердечко" onClick={() => putLike()} />
                        }
                    </div>
                </div>
            ) : undefined}
        </div>
    )
}