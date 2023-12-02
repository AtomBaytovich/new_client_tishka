import { PencilEmoji } from "../../assets/emoji/pencil";
import { SearchInput } from "../../seacrhInput";
import style from "./style.module.scss";

export const WriteCommentAndViews = () => {
    return (
        <div className={style.social}>
            <SearchInput
                backgroundColor={"#27273A"}
                placeholder="Обсудим?"
                icon={<PencilEmoji />}
            />
        </div>
    )
}