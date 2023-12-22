import { DropDownButton } from "..";
import { StringRating } from "../../../stringRating";
import style from "./style.module.scss";


export const TopDropDown = ({ data }) => {
    let list = data.map((el) => {
        return (<StringRating name={el.name} key={el.id} isFirst={el.isFirst} />)
    })
    return (
        <DropDownButton text={"ТОП 10 Немо"}>
            <div className={style.rating}>
                {list}
            </div>
        </DropDownButton>
    )
}