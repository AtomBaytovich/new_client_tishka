import { DropDownButton } from "../../pageHome/dropDownButton";
import style from "./style.module.scss";

export const RevealMeDropDown = () => {
    return (
        <DropDownButton text={"Раскрой меня"}>
            <div className={style.reveal}>
                <img src="/assets/main/reveal.png" alt="Раскрой меня" />
                <div className={style.list}>
                    <p>Привет!</p>
                    <p>Я очень рад, что ты сюда зашёл</p>
                    <p>Здесь, со мной, с нами, ты можешь поделиться своими мыслями</p>
                    <p>Стоит просто попробовать</p>
                    <p>Поверь, ты не одинок!</p>
                    <p>P.S. Справа вверху нажми на карандашик</p>
                </div>
            </div>
        </DropDownButton>
    )
}