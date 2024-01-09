import { TgEmoji } from "../assets/emoji/tg";
import style from "./style.module.scss";

export const Footer = () => {
    return (
        <footer>
            <div className={style.st}>
                <p>КОМПИК ТИШКИ</p>
                <a href="https://t.me/pk_tih"><TgEmoji /></a>
            </div>
        </footer>
    )
}