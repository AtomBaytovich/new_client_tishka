import { Button } from "../button";
import style from "./style.module.scss";

export const SectionPurpose = () => {
    return (
        <section className={style.sectionPurpose}>
            <div className={style.title}>
                <p>Цель этого проекта</p>
            </div>
            <div className={style.container}>
                <p className={`${style.answer} ${style.answerMob}`}>Дать возможность почувстовать себя нужным, свободным и открытым, не раскрывая при этом личности</p>
                <img className={style.volodyaTop} src="./assets/main/volodya-top.png" alt="Володя реально топ подписывайтесь https://t.me/atom_baytovich" />
                <div className={style.miniCont}>
                    <p className={`${style.answer} ${style.answerPk}`}>Дать возможность почувстовать себя нужным, свободным и открытым, не раскрывая при этом личности</p>
                    <p className={`${style.text} text__container`}>Однажды глубокой осенью 2022 года я захотел поделиться своими мыслями, переживаниями с кем- то.... Но такой возможности у меня не оказалось, да и вряд ли моим знакомым можно было такое рассказывать</p>
                    <Button className={style.custom}><p className={style.buttonsOne}>Присоединиться</p></Button>
                </div>
            </div>
        </section>
    )
}