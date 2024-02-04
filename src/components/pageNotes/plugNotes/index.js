import { useEffect, useState } from "react";
import { BackEmoji } from "../../assets/emoji/back";
import style from "./style.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const mopiks = [
    {
        _id: "1",
        text: `<img src="./assets/main/tishka-bala1.png" alt="https://t.me/atom_baytovich"></img> 1. Привет!! Это проект Компик Тишки. \n\nДа, он так называется. Придумал и разработал его Вова, а его любимая половинка Аня помогала ему с картинками (это она рисовала) :)\n\nЧто за проект? Проект, чтобы делится своими чувствами, эмоциями, но при этом чтобы никто не знал кто ты, что ты и почему ты. \nТы немо. Я немо. 
        <a href="/?id=2" style="color: burlywood;">См.дальше</a>`,
        desc: `1. Привет!! Это проект Компик Тишки. \n\nДа, он так называется. Придумал и разработал его Вова, а его любимая половинка Аня помогала ему с картинками (это она рисовала) :)\n\nЧто за проект? Проект, чтобы делится своими чувствами, эмоциями, но при этом чтобы никто не знал кто ты, что ты и почему ты. \nТы немо. Я немо.`
    },
    {
        _id: "2",
        text: `<img src="./assets/main/tishka-bala2.png" alt="https://t.me/atom_baytovich"></img> 2. О да... Второй пункт... Ты ещё читаешь? Молодец\n\nЗначит тебя заинтересовал проект. Если это действительно так, то я очень рад)\n\nВ этом разделе, когда авторизуешься, ты сможешь писать всё что тебя вздумается (кроме правил, которые что-то ограничивают)
        \n<a href="/?id=3" style="color: burlywood;">См.дальше</a>`,
        desc: `2. О да... Второй пункт... Ты ещё читаешь? Молодец\n\nЗначит тебя заинтересовал проект. Если это действительно так, то я очень рад)\n\В этом разделе, когда авторизуешься, ты сможешь писать всё что тебя вздумается (кроме правил, которые что-то ограничивают)`
    },
    {
        _id: "3",
        text: `<img src="./assets/main/tishka-bala3.png" alt="https://t.me/atom_baytovich"></img> 3. Просто зарегистрируйся здесь и начни писать. Все будут видеть твои мысли, желания, но никто не будет знать кто ты. \n\nЯ специально делал проект полностью анонимным и никакие твои личные данные, по которым можно найти тебя, не храню у себя.
        \n<a href="/?id=4" style="color: burlywood;">См.дальше</a>`,
        desc: `3. Просто зарегистрируйся здесь и начни писать. Все будут видеть твои мысли, желания, но никто не будет знать кто ты. \n\nЯ специально делал проект полностью анонимным и никакие твои личные данные, по которым можно найти тебя, не храню у себя.`
    },
    {
        _id: "4",
        text: `4. Кто такой немо? - здесь это ты.\n\nНемо - вымышленный персонаж из романа "Двадцать тысяч лье под водой" Жюля Верна 🙃. \n\n Это неопознанный объект, человек без имени, проще говоря скрытная личность. \n\n Ну всё, давай регистрируйся в кнопке Аккаунт и пиши туда свои мысли 
        \n<a href="/auth" style="color: burlywood;">Нажми, чтобы авторизоваться</a>
        `,
        desc: `4. Кто такой немо? - здесь это ты.\n\nНемо - вымышленный персонаж из романа "Двадцать тысяч лье под водой" Жюля Верна 🙃. \n\n Это неопознанный объект, человек без имени, проще говоря скрытная личность. \n\n Ну всё, давай регистрируйся в кнопке Аккаунт и пиши туда свои мысли`
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
    const navigate = useNavigate();
    const location = useLocation();
    const [openWrite, setOpenWrite] = useState(false);
    const [dataWrite, setDataWrite] = useState({
        id: undefined,
        text: ""
    })
    const openWriteFunc = (id) => {
        const mopik = mopiks.find(el => el._id == id);
        if (!mopik) {
            setOpenWrite(false);
            setDataWrite({
                id: undefined,
                text: ""
            })
            return;
        }
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
        navigate('')
    }

    useEffect(() => {
        if (openWrite && location.search == "") {
            setOpenWrite(false);
            setDataWrite({
                id: undefined,
                text: ""
            })
            return;
        }
        if (location.search == "") return;
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get("id");
        openWriteFunc(id)
    }, [location.search]);
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
                                onClick={() => navigate(`?id=${el._id}`)}
                                text={el.desc}
                                key={el._id}

                            />
                        )}
                    </div >
                </div>
            }
            {openWrite == true &&
                <div className={style.write}>
                    <div className={style.textareaElement} dangerouslySetInnerHTML={{ __html: dataWrite.text }}>
                    </div>
                </div>
            }
        </div>
    )
}