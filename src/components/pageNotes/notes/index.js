import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { BackEmoji } from "../../assets/emoji/back";


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

export const Notes = () => {
    const [openWrite, setOpenWrite] = useState(false);
    const [dataWrite, setDataWrite] = useState("")
    const inputRef = useRef(null);

    const getValue = () => {
        const value = inputRef.current.innerText;
        console.log(value);
    };

    const openWriteFunc = (id) => {
        // console.log(id)
        let { text } = getDataMopik(id)
        setDataWrite(text)
        // console.log(text)
        setOpenWrite(true)
    }

    const write = ({ text }) => {
        setDataWrite(text)
        // console.log(text)
    }

    const closeWrite = () => {
        setOpenWrite(false);
        setDataWrite("");
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
                            onClick={() => setOpenWrite(true)}
                        />
                    </div>
                    <div className={style.list}>
                        <CardNotes
                            id={1}
                            onClick={(id) => openWriteFunc(id)}
                            text={`Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город.`}
                        />
                        <CardNotes
                            id={2}
                            onClick={(id) => openWriteFunc(id)}
                            text="ООо магааад"
                        />
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
                    >
                    </div>
                </div>
                : <div></div>}
        </div>
    )
}