import { TextareaComment } from "../../areaComment/index.js";
import { PencilEmoji } from "../../assets/emoji/pencil";
import { Comment } from "../../blockComment/index.js";
import style from "./style.module.scss";

export const WriteCommentAndViews = ({ onSubmit = () => { } }) => {
    return (
        <div className={style.social}>
            <TextareaComment
                backgroundColor={"#27273A"}
                placeholder="Обсудим?"
                icon={<PencilEmoji />}
                onSubmit={onSubmit}
            />
            <div>
                <Comment text={"В свободное время мама гуляла в лесу и на реке. Она любила искать грибы и ягоды, а также наблюдать за животными и птицами."} />
            </div>
        </div>
    )
}