import { Link } from "react-router-dom";
import { TgEmoji } from "../assets/emoji/tg";
import style from "./style.module.scss";
import { GmailEmoji } from "../assets/emoji/gmail";

export const Footer = () => {
    return (
        <footer>
            <div className={style.main}>
                <div className={style.st}>
                    <p>КОМПИК ТИШКИ</p>
                    <div className={style.socials}>
                        <a href="mailto:vb77443@gmail.com"><GmailEmoji /></a>
                        <a href="https://t.me/pk_tih"><TgEmoji /></a>
                    </div>
                </div>
                <div className={style.links}>
                    <a href={"/privacy"}>Политика конфиденциальности</a>
                    <Link to={"https://t.me/atom_baytovich"}>© Бондаренко В.А., 2024</Link>
                </div>
            </div>
        </footer>
    )
}