import { Card } from "../card";
import style from "./style.module.scss";

export const SectionWhat = () => {
    return (
        <section className="">
            <div className={style.whatP}>
                <p>Что это за проект?</p>
            </div>
            <div className={style.cards}>
                <Card>
                    <div className={style.card}>
                        <img src="./assets/smiles/clown.png" alt="клоун епта" />
                        <p>Выплёскивай свои обиды, переживания*</p>
                    </div>
                </Card>
                <Card>
                    <div className={style.card}>
                        <img src="./assets/smiles/moon.png" alt="лунааа епта" />
                        <p>Всё анонимно.<br />Ты “немо”.<br />Я “немо”.</p>
                    </div>
                </Card>
                <Card>
                    <div className={style.card}>
                        <img src="./assets/smiles/joystick.png" alt="джойстик епта" />
                        <p>Сделай свою кладовую воспоминаний</p>
                    </div>
                </Card>
                <Card>
                    <div className={style.card}>
                        <img src="./assets/smiles/pumpkin.png" alt="тыковкаа епта" />
                        <p>Читай мысли и истории других людей</p>
                    </div>
                </Card>
            </div>
            <p className={`${style.whatTwo} whantTwo__container`}>Здесь ты можешь чувствовать себя в безопасности, писать свои переживания   анонимно как на весь мир, так только для себя.</p>
        </section>
    )
}