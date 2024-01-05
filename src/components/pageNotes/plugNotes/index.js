import { useState } from "react";
import { BackEmoji } from "../../assets/emoji/back";
import style from "./style.module.scss";

const mopiks = [
    {
        _id: "1",
        text: "1. Привет!! Это проект Компик Тишки. \n\nДа, он так называется. Придумал и разработал его Вова, а его любимая половинка Аня помогала ему с картинками (это она рисовала) :)\n\nЧто за проект? Проект .чтобы делится своими чувствами , эмоциями, но при этом чтобы никто не знал кто ты, что ты и почему ты. \nТы немо. Я немо. "
    },
    {
        _id: "2",
        text: "2. О да... Второй пункт... Ты ещё читаешь? Молодец\n\nЗначит тебя заинтересовал проект. Если это действительно так, то я очень рад)\n\nЗдесь ты можешь писать всё что тебя вздумается (кроме правил, которые что-то ограничивают)"
    },
    {
        _id: "3",
        text: "3. Просто зарегистрируйся здесь и начни писать. Все будут видеть твои мысли, желания, но никто не будет знать кто ты. \n\nЯ специально делал проект полностью анонимным и никакие твои личные данные, по которым можно найти тебя, не храню у себя."
    },
]

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

export const PlugNotes = () => {
    const [openWrite, setOpenWrite] = useState(false);
    const [dataWrite, setDataWrite] = useState({
        id: undefined,
        text: ""
    })
    const openWriteFunc = (id) => {
        const mopik = mopiks.find(el => el._id == id);
        setDataWrite({
            id,
            text: mopik.text
        });
        setOpenWrite(true);
    }
    const closeWrite = () => {
        setOpenWrite(false);
        setDataWrite({
            id: undefined,
            text: ""
        })
    }
    return (
        <div className={style.notes}>
            {(openWrite == true) && (
                <div className={`${style.notSee}`}>
                    <div onClick={() => closeWrite()} className={style.back}>
                        <BackEmoji />
                    </div>
                </div>
            )}

            {(openWrite == false) &&
                <div className={`${style.see} ${style.element}`} >
                    <div className={style.lvl} id="foo" >
                        <div className={style.lvl_ru}><p>Раздел</p><p>блокнот</p></div>
                    </div>
                    <div className={style.list} >
                        {mopiks.map((el) =>
                            <CardNotes
                                id={el._id}
                                onClick={() => openWriteFunc(el._id)}
                                text={el.text}
                                key={el._id}

                            />
                        )}
                    </div >
                </div>
            }
            {openWrite == true &&
                <div className={style.write}>
                    <div className={style.textareaElement}>
                        {dataWrite.id == 1 && <img src="./assets/main/tishka-bala1.png" alt="https://t.me/atom_baytovich"></img>}
                        {dataWrite.id == 2 && <img src="./assets/main/tishka-bala2.png" alt="https://t.me/atom_baytovich"></img>}
                        {dataWrite.id == 3 && <img src="./assets/main/tishka-bala3.png" alt="https://t.me/atom_baytovich"></img>}
                        {dataWrite.text}
                    </div>
                </div>
            }
        </div>
    )
}