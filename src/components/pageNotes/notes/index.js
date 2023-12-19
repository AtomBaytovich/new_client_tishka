import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { BackEmoji } from "../../assets/emoji/back";
import { useDispatch, useSelector } from "react-redux";
import { createNote, getNote, putNote } from "../../../store/notes/note.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { addNew, clear, getNoteS, put } from "../../../store/notes/notes.slice";
import { SkeletonLoading } from "../skeleton";
import { MiniLoader } from "../miniLoader";


const CardNotes = ({
    id,
    text,
    onClick
}) => {
    return (
        <div className={style.cardNotes} id={id} onClick={() => onClick(id)}>
            <p>{text}</p>
        </div>
    )
}

const ListMopiksNotes = ({ openWriteFunc }) => {
    const state = useSelector(state => state.noteS0);
    const dispatch = useDispatch();
    const scrollRef = useRef();

    const handleScroll = (event) => {
        const scrollBottom = event.target.scrollTop +
            event.target.offsetHeight == event.target.scrollHeight;

        if (scrollBottom) {
            if (state.data.remainingItems > 0 && state.isLoading == false) {
                dispatch(
                    getNoteS({ start: state.data.mopiks.length, count: 20 })
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

    useEffect(() => {
        const handleScroll = () => {
            localStorage.setItem('scrollPositionNotes', scrollRef.current.scrollTop);
        };

        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [scrollRef.current]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = localStorage.getItem('scrollPositionNotes') || 0;
        }
    }, []);

    if (state.isLoading && state.data.mopiks.length == 0) return <p style={{
        margin: "auto",
        color: "rgba(255, 255, 255, 0.51)",
        fontFamily: "Verdana"
    }}>Загрузка ...</p>

    return (
        <div className={style.list} onScroll={handleScroll} ref={scrollRef} >
            {state.data.mopiks.map((el) =>
                <CardNotes
                    id={el._id}
                    onClick={() => openWriteFunc(el._id)}
                    text={el.text}
                    key={el._id}
                />
            )}
            {state.isLoading &&
                <SkeletonLoading />
            }
        </div >
    )
}

export const Notes = () => {
    const dispatch = useDispatch();
    const mopik = useSelector(state => state.note);
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
            dispatch(getNoteS({ start: 0, count: 20 }))
        }
        return () => {
            dispatch(clear())
            localStorage.removeItem('scrollPositionNotes')
        }
    }, [])

    useEffect(() => {
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
            .catch(() => {
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
            const delay = 800;
            const sendData = () => {
                // Отправка текста на сервер
                if ((dataWrite == mopik.mopik.text) == false) {
                    dispatch(putNote({ id: mopik.mopik._id, text: inputRef.current.innerText }))
                    // это можно как - то по другому
                    dispatch(put({ id: mopik.mopik._id, text: inputRef.current.innerText }))
                }
            }
            typingTimer = setTimeout(sendData, delay);
            return () => {
                clearTimeout(typingTimer);
            }
        }
    }, [focus, dataWrite]);

    // useEffect(() => {
    //     if(openWrite == false)
    // }, [openWrite])

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
                dispatch(addNew({ ...res.mopik, text: "" }))
                const _id = res.mopik._id;
                const searchParams = new URLSearchParams(location.search);
                searchParams.set('id', _id); // Здесь 'param' - имя параметра, 'value' - его значение

                const newUrl = `${location.pathname}?${searchParams.toString()}`;

                window.history.pushState(null, '', newUrl);
                setRulesText(true)
            })
            .catch(() => {
                setRulesText(false)
                setOpenWrite(false);
            })
    }

    return (
        <div className={style.notes}>
            {(openWrite == true) && (
                <div className={`${style.notSee}`}>
                    <div onClick={() => {
                        if (mopik.isLoading == false) closeWrite()
                    }} className={style.back}>
                        <BackEmoji />
                    </div>
                    {(mopik.put.loading || mopik.isLoading == true) && <MiniLoader />}
                </div>
            )}

            {(openWrite == false) &&
                <div className={`${style.see} ${style.element}`} >
                    <div className={style.lvl} id="foo" >
                        <p>Мои мопики</p>
                        <img
                            src="./assets/notes/pencil.png"
                            alt="Карандашек"
                            onClick={() => newMopik()}
                        />
                    </div>
                    <ListMopiksNotes openWriteFunc={openWriteFunc} />
                </div>
            }
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
        </div>
    )
}