import { useCallback, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { WriteCommentAndViews } from "./social";
import { BlockAvatar } from "../blockAvatar";
import { getCommentsMopik, getMopik, postCommentMopik, putLikeMopik, seeMopik } from "../../api/services/mopiks";
import { useSelector } from "react-redux";

export const Mopik = ({ id, text }) => {
    const [nextView, setNextView] = useState(false)
    const [tapCount, setTapCount] = useState(0);
    const [idTimeout, setIdTimeout] = useState(undefined)
    const [data, setData] = useState({
        isLoading: true,
        mopik: {}
    })
    const [date, setDate] = useState();
    const [comments, setComments] = useState({
        data: [],
        isLoading: true,
        remainingItems: undefined,
        totalItems: undefined,
    })
    const textRef = useRef(null);
    const blockRef = useRef(null);
    const stateAuth = useSelector((state) => state.auth);

    const handleScroll = useCallback(() => {
        const block = blockRef.current;
        if (block && block.getBoundingClientRect().top < window.innerHeight &&
            block.getBoundingClientRect().bottom >= 0 && !block.isView) {
            block.isView = true;
            seeMopik({ _id: block?.id }).catch()
            // Здесь запустите действия, когда блок видим, например, увеличение просмотров и т.д.
        }
    }, []);

    useEffect(() => {
        // Добавляем обработчик события прокрутки при монтировании компонента
        window.addEventListener('scroll', handleScroll);
        blockRef.current.isView = false;
        return () => {
            // Удаляем обработчик события прокрутки при размонтировании компонента
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const loadingComments = ({ start, count }) => {
        setComments((v) => ({ isLoading: true, ...v }))
        getCommentsMopik({ _id: id, start, count, date })
            .then(res => {
                setComments({
                    isLoading: false,
                    remainingItems: res.remainingItems,
                    totalItems: res.totalItems,
                    data: [...comments.data, ...res.comments]
                })
            })
            .catch(err => console.log(err))
    }

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
                const now = new Date()
                setDate(now)
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

                        getCommentsMopik({ _id: id, start: 0, count: 1, date: now })
                            .then(res => {
                                setComments({
                                    isLoading: false,
                                    remainingItems: res.remainingItems,
                                    totalItems: res.totalItems,
                                    data: res.comments
                                })
                            })
                            .catch(err => console.log(err))

                        console.log(res)
                    })
                    .catch(err => {
                        setData((v) => ({
                            ...v,
                            isLoading: false
                        }));
                        console.log(err)
                    })
            } else {
                setComments({
                    data: [],
                    isLoading: true,
                    remainingItems: undefined,
                    totalItems: undefined,
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
        setComments((v) => ({ isLoading: true, ...v }))
        postCommentMopik({ _id: id, text: v })
            .then(res => {
                console.log(res)
                setComments(v => ({
                    isLoading: false,
                    remainingItems: v.remainingItems += 1,
                    totalItems: v.totalItems += 1,
                    data: [res.comment, ...comments.data]
                }))
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
                            <WriteCommentAndViews
                                comments={comments.data}
                                onSubmit={(v) => postComment({ v })}
                                remainingItems={comments.remainingItems}
                                nextCommentClick={() => {
                                    if (comments.remainingItems > 0) {
                                        loadingComments({ start: comments.data.length, count: 5 })
                                    }
                                }}
                            />
                        </div>
                    </>
                ) : undefined}
            </div>
            {nextView && data.isLoading == false ? (
                <div className={style.meta}>
                    <div className={style.like}>
                        {stateAuth.isAuthenticated == false && <img src="./assets/smiles/mopik/likeauth.png" alt="Сердечко" />}
                        {(stateAuth.isAuthenticated && data.mopik.userLiked) &&
                            <img src="./assets/smiles/mopik/like.png" alt="Сердечко" onClick={() => putLike()} />
                        }
                        {(stateAuth.isAuthenticated && data.mopik.userLiked == false) &&
                            <img src="./assets/smiles/mopik/unlike.png" alt="Сердечко" onClick={() => putLike()} />}

                    </div>
                </div>
            ) : undefined}
        </div>
    )
}