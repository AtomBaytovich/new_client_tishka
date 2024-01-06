import { formatNumber } from "../../../utils/nubmer";
import { DropDownButton } from "../../pageHome/dropDownButton";
import { StringInfo } from "../stringInfo";
import style from "./style.module.scss";

function isValidDate(dateObject) {
    return dateObject instanceof Date && !isNaN(dateObject.getTime());
}

function formatDateTime(date) {
    date = new Date(date);
    if (isValidDate(date) == false) return "Пока что нет"
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Moscow' // Указываем часовой пояс Москвы
    };

    const dateTime = date.toLocaleDateString('ru-RU', options);
    return dateTime;
}



export const StataDropDown = ({
    dateReg,
    countMopiks,
    countViewMopiks,
    firstDateMopik,
    lastDateMopik
}) => {
    return (
        <DropDownButton text={"Статистика"}>
            <div className={style.stata}>
                <StringInfo title={"Регистрация"} text={formatDateTime(dateReg)} />
                <StringInfo title={"Кол-во мопиков:"} text={countMopiks} />
                {/* <StringInfo title={"Лайков на мопиках:"} text={"32"} />
                <StringInfo title={"Ком-ев на мопиках:"} text={"7"} /> */}
                <StringInfo title={"Просмотров мопики:"} text={formatNumber(Number(countViewMopiks))} />
                <StringInfo title={"Дата 1-го мопика:"} text={formatDateTime(firstDateMopik)} />
                <StringInfo title={"Дата последнего:"} text={formatDateTime(lastDateMopik)} />
            </div>
        </DropDownButton>
    )
}