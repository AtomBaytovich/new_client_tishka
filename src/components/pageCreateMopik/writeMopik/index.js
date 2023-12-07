import { TextareaComment } from "../../areaComment";
import { Checkbox } from "../../checkbox";
import style from "./style.module.scss";

export const WriteMopik = () => {
    return (
        <div>
            <div className={style.checkboxs}>
                <Checkbox text={"Личный мопик?"} />
                <Checkbox text={"Отключить комментирование?"} />
            </div>
            <TextareaComment
                minHeight={90}
                maxHeight={300}
                placeholder="Текст помика... начни писать... ты справишься!"
            />
        </div>
    )
}