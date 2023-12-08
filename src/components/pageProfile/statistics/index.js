import { DropDownButton } from "../../pageHome/dropDownButton";
import { StringInfo } from "../stringInfo";
import style from "./style.module.scss";

export const StataDropDown = () => {
    return (
        <DropDownButton text={"Статистика"}>
            <div className={style.stata}>
                <StringInfo title={"Регистрация"} text={"27.08.2023"} />
                <StringInfo title={"Кол-во мопиков:"} text={"19"} />
                <StringInfo title={"Лайков на мопиках:"} text={"32"} />
                <StringInfo title={"Ком-ев на мопиках:"} text={"7"} />
                <StringInfo title={"Просмотров мопики:"} text={"765"} />
                <StringInfo title={"Дата 1-го мопика:"} text={"27.08.2023 21:13 по мск"} />
                <StringInfo title={"Дата последнего:"} text={"28.08.2023 14:19 по мск"} />
            </div>
        </DropDownButton>
    )
}