import { FindEmoji } from "../assets/emoji/find";
import style from "./style.module.scss";

export const SearchInput = ({ backgroundColor, placeholder = "Поиск мопика...", icon = <FindEmoji /> }) => {
    return (
        <div className={style.seacrh}>
            <input placeholder={placeholder} style={{ backgroundColor: backgroundColor ? backgroundColor : null}}/>
            <div className={style.searchIcon}>{icon}</div>
        </div>
    )
}