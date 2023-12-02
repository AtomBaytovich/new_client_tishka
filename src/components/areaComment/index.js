import { PencilEmoji } from "../assets/emoji/pencil";
import style from "./style.module.scss";

export const TextareaComment = ({ backgroundColor, placeholder = "Обсудим?", icon = <PencilEmoji /> }) => {
    return (
        <div className={style.main}>
            <div
                placeholder={placeholder}
                className={style.textareaElement}
                contentEditable={true}
                style={{ backgroundColor: backgroundColor ? backgroundColor : null }}
            >
            </div>
            <div className={style.searchIcon}>{icon}</div>
        </div>
    )
}