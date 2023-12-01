import { DropDownButton } from ".."
import style from "./style.module.scss";

export const RulesDropDown = () => {
    return (
        <DropDownButton text={"Важные правила"}>
            <div className={style.rulesTV}>
                <img src="./assets/main/rules.png" alt="Тишка в телеке" />
            </div>
            <div className={style.rules}>
                <div className={style.ruleElements}>
                    <div className={style.element}>
                        <img src="./assets/smiles/home/bask.png" />
                        <p>Чувства каждого важны! <br />Если человек поделился чем-либо, то поддержи его!</p>
                    </div>
                    <div className={style.element}>
                        <img src="./assets/smiles/home/hugging.png" />
                        <p>Старайся быть добрее! <br />Этот проект любит тебя!</p>
                    </div>
                    <div className={style.element}>
                        <img src="./assets/smiles/home/hidden.png" />
                        <p>Нельзя раскрывать свою личность!</p>
                    </div>
                    <div className={style.element}>
                        <img src="./assets/smiles/home/evil.png" />
                        <p>Не нужно спамить, много-много ругаться не по теме.</p>
                    </div>
                    <div className={style.element}>
                        <img src="./assets/smiles/home/speaker.png" />
                        <p>Если понравился проектом, то поделись им </p>
                    </div>
                </div>
                
                <p className={style.ruleLearn}>Читать дальше</p>
            </div>
        </DropDownButton>
    )
}