import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { WriteCommentAndViews } from "./social";
import { BlockAvatar } from "../blockAvatar";

export const Mopik = ({ id, text, countView }) => {
    // const [isBlockInView, setIsBlockInView] = useState(false);
    const [nextView, setNextView] = useState(false)
    const [tapCount, setTapCount] = useState(0);
    const [idTimeout, setIdTimeout] = useState(undefined)

    // const blockRef = useRef(null);

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    // }, []);

    // const handleScroll = () => {
    //     if (isInViewPort(blockRef.current)) {
    //         setIsBlockInView(true);
    //     }
    // }

    // const isInViewPort = (element) => {
    //     const rect = element.getBoundingClientRect();
    //     return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    // }

    // useEffect(() => {
    //     if (isBlockInView) return console.log(id)
    // }, [isBlockInView])

    const blockRef = useRef(null);

    const handleScroll = () => {
        const block = blockRef.current;
        if (block) {
            const blockTop = block.getBoundingClientRect().top;
            const blockBottom = block.getBoundingClientRect().bottom;

            // Проверяем, находится ли блок в области видимости окна просмотра
            if (blockTop < window.innerHeight && blockBottom >= 0) {
                // Блок видим, выполняем нужные действия
                // console.log('Блок видим');
                if (blockRef.current?.isView == false) {
                    blockRef.current.isView = true;
                    // console.log(id)
                    console.log("s")
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
        <div className={style.mopik} id={id} ref={blockRef}>
            <div className={style.data} style={nextView ? { borderRadius: "10px 0px 0px 10px" } : null}>
                <div className={style.written} onClick={() => handleTap()}>
                    {/* <p className={style.title}>{title}</p> */}
                    <p className={style.text}>{text}</p>
                </div>
                {nextView ? (
                    <>
                        <BlockAvatar />
                        <div className={style.social}>

                            <WriteCommentAndViews />
                        </div>
                    </>
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
                    {/* <div className={style.views}>{countView}</div> */}
                </div>
            ) : undefined}
        </div>
    )
}