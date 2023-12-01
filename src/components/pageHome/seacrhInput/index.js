import { FindEmoji } from "../../assets/emoji/find";
import style from "./style.module.scss";

export const SearchInput = () => {
    return (
        <div className={style.seacrh}>
            <input placeholder="Поиск мопика..."/>
            <div className={style.searchIcon}><FindEmoji /></div>
        </div>
    )
}