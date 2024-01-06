import { useSelector } from "react-redux";
import { TextareaComment } from "../../areaComment/index.js";
import { PencilEmoji } from "../../assets/emoji/pencil";
import { Comment } from "../../blockComment/index.js";
import style from "./style.module.scss";

export const WriteCommentAndViews = ({
    onSubmit = () => { },
    nextCommentClick = () => { },
    comments = [],
    remainingItems
}) => {
    const stateAuth = useSelector((state) => state.auth);
    let list = comments.map((el) =>
        <Comment text={el.text} name={el.user.nickname} key={el._id} />
    )
    return (
        <div className={style.social}>
            {stateAuth.isAuthenticated && <TextareaComment
                backgroundColor={"#27273A"}
                placeholder="Обсудим?"
                icon={<PencilEmoji />}
                onSubmit={onSubmit}
            />}
            <div className={style.list}>
                {list}
            </div>
            {remainingItems > 0 && <div className={style.next} onClick={nextCommentClick}>Смотреть комментарии дальше</div>}
        </div>
    )
}