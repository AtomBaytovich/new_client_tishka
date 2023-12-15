import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { BackEmoji } from "../../assets/emoji/back";
import { useDispatch, useSelector } from "react-redux";
import { controllerStopSignalGetNot, createNote, getNote, putNote } from "../../../store/notes/note.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { clear, getNoteS } from "../../../store/notes/notes.slice";

const CardNotes = ({
    id,
    text,
    onClick
}) => {
    return (
        <div className={style.cardNotes} style={{ padding: "103px" }} id={id} onClick={() => onClick(id)}>
            <p>{text}</p>
        </div>
    )
}

const ListMopiksNotes = ({ openWriteFunc }) => {
    const state = useSelector(state => state.noteS0);
    const dispatch = useDispatch();

    const handleScroll = (event) => {
        const scrollBottom = event.target.scrollTop +
            event.target.offsetHeight == event.target.scrollHeight;

        if (scrollBottom) {
            if (state.data.remainingItems > 0) {
                dispatch(
                    getNoteS({ start: state.data.mopiks.length, count: 3 })
                )
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (state.isLoading && state.data.mopiks.length == 0) return <p style={{
        margin: "auto",
        color: "rgba(255, 255, 255, 0.51)",
        fontFamily: "Verdana"
    }}>Загрузка ...</p>

    return (
        <div className={style.list} onScroll={handleScroll}>
            {state.data.mopiks.map((el, id) =>
                <CardNotes
                    id={el._id}
                    onClick={() => openWriteFunc(el._id)}
                    text={el.text}
                    key={el._id}
                />
            )}
            {state.isLoading && <div>Загрузка...</div>}
        </div >
    )
}

export const Notes = () => {
    const dispatch = useDispatch();
    const mopik = useSelector(state => state.note);
    const state = useSelector(state => state.noteS0);
    const [openWrite, setOpenWrite] = useState(false);
    const [rulesText, setRulesText] = useState(false);
    const [dataWrite, setDataWrite] = useState("")
    const [focus, setFocus] = useState(false)
    const inputRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();
    let didInit = false;

    const updateQueryParams = (query, params = {}) => {
        const currentSearchParams = new URLSearchParams(window.location.search);
        currentSearchParams.set('id', query);
        navigate(`?${currentSearchParams.toString()}`, params);
    };

    useEffect(() => {
        if (!didInit) {
            didInit = true;
            dispatch(getNoteS({ start: 0, count: 3 })).then(() => console.log(state.data.mopiks))
        }
        return () => {
            dispatch(clear())
        }
    }, [])

    useEffect(() => {
        // Здесь вы можете выполнить код, который будет выполняться при изменении query параметров
        console.log('Изменение query параметров:', location.search);
        if (openWrite && location.search == "") {
            setOpenWrite(false);
            setRulesText(false)
            setDataWrite("");
            return;
        }
        if (location.search == "") return;
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get("id");
        setOpenWrite(true);
        if (id) dispatch(getNote({ id }))
            .unwrap()
            .then(res => {
                if (res.mopik?.text) {
                    setRulesText(true)
                    setDataWrite(res.mopik?.text)
                }
            })
            .catch(err => {
                navigate('', { replace: true });
                setRulesText(false)
                setOpenWrite(false);
            })
    }, [location.search]);

    const openWriteFunc = (id) => {
        updateQueryParams(id)
    }

    useEffect(() => {
        if (focus && openWrite) {
            let typingTimer;
            const delay = 1500; // полторы секунды
            const sendData = () => {
                // Отправка текста на сервер
                if ((dataWrite == mopik.mopik.text) == false) {
                    dispatch(putNote({ id: mopik.mopik._id, text: inputRef.current.innerText }))
                }
            }
            typingTimer = setTimeout(sendData, delay);
            return () => {
                clearTimeout(typingTimer);
            }
        }
    }, [focus, dataWrite]);

    useEffect(() => {
        if (openWrite && dataWrite && dataWrite.length > 0 && rulesText) {
            inputRef.current.innerText = dataWrite
        }
    }, [rulesText])

    const closeWrite = () => {
        setOpenWrite(false);
        setRulesText(false)
        setDataWrite("");
        navigate('')
    }

    const write = ({ text }) => {
        setDataWrite(text)
    }

    const newMopik = () => {
        setOpenWrite(true);
        dispatch(createNote())
            .unwrap()
            .then(res => {
                const _id = res.mopik._id;
                const searchParams = new URLSearchParams(location.search);
                searchParams.set('id', _id); // Здесь 'param' - имя параметра, 'value' - его значение

                const newUrl = `${location.pathname}?${searchParams.toString()}`;

                window.history.pushState(null, '', newUrl);
                setRulesText(true)
            })
            .catch(err => {
                console.log(err)
                setRulesText(false)
                setOpenWrite(false);
            })
    }
    /* notes - redux - 
    чтобы когда назад - стояло все на своей позиции, 
    добавление записи, 
    сохрание - показывать, 
    анимация
    
    */
    return (
        <div className={style.notes}>
            {/* <div> */}
            {(openWrite == true && mopik.isLoading == false) && (
                <div className={style.notSee}>
                    <div onClick={() => closeWrite()} className={style.back}>
                        <BackEmoji />
                    </div>
                </div>
            )}

            {(openWrite == false) && <div className={style.see} >
                <div className={style.lvl}>
                    <p>Мои мопики</p>
                    <img
                        src="./assets/notes/pencil.png"
                        alt="Карандашек"
                        onClick={() => newMopik()}
                    />
                </div>
                <ListMopiksNotes openWriteFunc={openWriteFunc} />
            </div>}
            {(openWrite == true && mopik.isLoading == false) &&
                <div className={style.write}>
                    <div
                        onInput={(e) => write({ text: e.currentTarget.textContent })}
                        ref={inputRef}
                        placeholder={"Начни писать..."}
                        className={style.textareaElement}
                        contentEditable={true}
                        onFocus={() => setFocus(true)}
                    >
                    </div>
                </div>
            }
            {(mopik.isLoading == true) ? <p className={style.write} style={{
                // margin: "auto",
                color: "rgba(255, 255, 255, 0.51)",
                fontFamily: "Verdana"
            }}>Загрузка ...</p> : undefined}
        </div>
    )
}