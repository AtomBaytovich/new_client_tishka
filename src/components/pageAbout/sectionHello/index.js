import { Button } from "../button";
import style from "./style.module.scss";

export const SectionHello = () => {
    return (
        <section className={style.sectionHello}>
            <img src="../../assets/main/nemo-tishka.png" className={style.helloImg} alt="Любимые немо и тишка"></img>
            {/* <div className={style.hello}> */}
            <div className={style.helloLetsgo}>
                <div className={`${style.custom} helloLetsgo__container`}>
                    <h1>Делись своими чувствами и эмоциями здесь ❤️</h1>
                </div>
                <p className="helloLetsgo__container">Проект создан с трепетом и любовью для тебя!</p>
                <div className={style.custom}>
                    <p>Пиши - Делись - Мечтай</p>
                </div>
                {/* </div> */}
                <div className={style.buttons}>
                    <Button><a className={style.buttonsOne} href="/auth">Присоединиться</a></Button>
                    <Button backgroundColor="#504F75"><a className={style.buttonsTwo} href="https://t.me/pk_tih">Мы в tg</a></Button>
                </div>
            </div>
        </section >
    )
}