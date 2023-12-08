import { DropDownButton } from "../../pageHome/dropDownButton";
import style from "./style.module.scss";

export const StataDropDown = () => {
    return (
        <DropDownButton text={"Статистика"}>
            <div className={style.stata}></div>
        </DropDownButton>
    )
}