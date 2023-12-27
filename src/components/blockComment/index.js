import { BlockAvatar } from "../blockAvatar";
import style from "./style.module.scss";

export const Comment = ({ name, avatar, text }) => {
    return (
        <div className={style.comment}>
            <BlockAvatar name={name}/>
            <p>{text}</p>
        </div>
    )
}