import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { BackEmoji } from "../../assets/emoji/back";
import { createMopik, getAllMopik } from "../../../api/services/mopik";
import { useDispatch, useSelector } from "react-redux";
import { createNote, getNote, putNote } from "../../../store/notes/note.slice";


const CardNotes = ({
    id,
    text,
    onClick
}) => {
    // console.log(id)
    return (
        <div className={style.cardNotes} id={id} onClick={() => onClick(id)}>
            <p>{text}</p>
        </div>
    )
}

const getDataMopik = (id) => {
    if (id == 1) return {
        text: `Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. Было очень страшно оставлять дом, где она жила всю жизнь, но она решила, что ей нужно изменить свою жизнь.
        Прибыв в город, она была встречена далекими родственниками, у которых она пожила первое время. Они помогли ей найти квартиру и работу, чтобы она могла начать свою новую жизнь.`
    }
    else return {
        text: "ООо магааад"
    }
}

const ListMopiksNotes = ({ openWriteFunc }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllMopik()
            .then(res => {
                console.log(res.mopik)
                setData(res.mopik)
            })
    }, [])

    const list = data.map((el) => {
        return <CardNotes
            id={el._id}
            onClick={() => openWriteFunc(el._id)}
            text={el.text}
            key={el._id}
        />
    })

    return (
        <>
            {list}
        </>
    )
}

export const Notes = () => {
    const dispatch = useDispatch();
    const mopik = useSelector(state => state.note);
    const [openWrite, setOpenWrite] = useState(false);
    const [dataWrite, setDataWrite] = useState("")
    const [focus, setFocus] = useState(false)
    const inputRef = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (id) dispatch(getNote({ id }))
            .unwrap()
            .then(res => {
                setOpenWrite(true);
                if (res.mopik?.text) {
                    setDataWrite(res.mopik?.text)
                }
            })
            .catch(err => {
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.forEach((value, key) => {
                    searchParams.delete(key);
                });
                const newUrl = `${window.location.pathname}`;
                window.history.replaceState({}, '', newUrl);
                setOpenWrite(false);
            })
    }, [])

    const getValue = () => {
        const value = inputRef.current.innerText;
        console.log(value);
    };

    const openWriteFunc = (id) => {
        if (id) dispatch(getNote({ id }))
            .unwrap()
            .then(res => {
                setOpenWrite(true);
                if (res.mopik?.text) {
                    setDataWrite(res.mopik?.text)
                }
            })
            .catch(err => {
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.forEach((value, key) => {
                    searchParams.delete(key);
                });
                const newUrl = `${window.location.pathname}`;
                window.history.replaceState({}, '', newUrl);
                setOpenWrite(false);
            })
    }

    const write = ({ text }) => {
        setDataWrite(text)
    }

    useEffect(() => {
        if (focus && openWrite) {
            let typingTimer;
            const delay = 1500; // полторы секунды
            const sendData = () => {
                // Отправка текста на сервер
                console.log("ASLDL:DL:ASLDASDk[")
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

    const closeWrite = () => {
        setOpenWrite(false);
        setDataWrite("");
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.forEach((value, key) => {
            searchParams.delete(key);
        });
        const newUrl = `${window.location.pathname}`;
        window.history.replaceState({}, '', newUrl);
    }

    const newMopik = () => {
        dispatch(createNote())
            .unwrap()
            .then(res => {
                setOpenWrite(true);
                const _id = res.mopik._id;
                const params = new URLSearchParams(window.location.search);
                params.set('id', _id); // изменение значения параметра с именем 'myParam' на 'newValue'
                const newUrl = `${window.location.pathname}?${params.toString()}`;
                window.history.replaceState({}, '', newUrl); // замена текущего URL новым URL с измененными параметрами

            })
            .catch(err => {
                console.log(err)
                setOpenWrite(false);
            })
    }

    useEffect(() => {
        // console.log(openWrite)
        if (openWrite && dataWrite && dataWrite.length > 0) {
            inputRef.current.innerText = dataWrite
        }
    }, [openWrite])

    return (
        <div className={style.notes}>
            {openWrite ?

                <div className={style.notSee}>
                    <div onClick={() => closeWrite()} className={style.back}>
                        <BackEmoji />
                    </div>
                </div>
                :
                <div className={style.see}>
                    <div className={style.lvl}>
                        <p>Мои мопики</p>
                        <img
                            src="./assets/notes/pencil.png"
                            alt="Карандашек"
                            onClick={() => newMopik()}
                        />
                    </div>
                    <div className={style.list}>
                        <ListMopiksNotes openWriteFunc={openWriteFunc} />
                    </div>
                </div>
            }
            {openWrite ?
                <div className={style.write}>
                    <div
                        onInput={(e) => write({ text: e.currentTarget.textContent })}
                        ref={inputRef}
                        placeholder={"Начни писать..."}
                        className={style.textareaElement}
                        contentEditable={true}
                        onFocus={(e) => setFocus(true)}
                    >
                    </div>
                </div>
                : <div></div>}
        </div>
    )
}