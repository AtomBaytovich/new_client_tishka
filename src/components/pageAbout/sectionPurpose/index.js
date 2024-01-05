import { Button } from "../button";
import style from "./style.module.scss";

export const SectionPurpose = ({
    answerMob,
    text,
    img,
    reverse = false
}) => {
    return (
        <section className={style.sectionPurpose}>
            <div className={style.title}>
                <p>Цель этого проекта</p>
            </div>
            <div className={`${style.container} ${reverse ? style.reversepjs: null}`}>
                <p className={`${style.answer} ${style.answerMob}`}>{answerMob}</p>
                <img className={style.volodyaTop} src={img} alt="Володя реально топ подписывайтесь https://t.me/atom_baytovich" />
                <div className={style.miniCont}>
                    <p className={`${style.answer} ${style.answerPk}`}>{answerMob}</p>
                    <p className={`${style.text} text__container`}>{text}</p>
                    <Button className={style.custom}><p className={style.buttonsOne}>Присоединиться</p></Button>
                </div>
            </div>
        </section >
    )
}