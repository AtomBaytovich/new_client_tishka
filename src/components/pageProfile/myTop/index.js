import { DropDownButton } from "../../pageHome/dropDownButton";
import { StringRating } from "../../stringRating";
import style from "./style.module.scss";

export const MyTopDropDown = ({ data, inTheTop = "99" }) => {
    console.log(data)
    let list = data.map((el) => {
        return (<StringRating name={el.name} key={el.id} isFirst={el.isFirst} />)
    })
    return (
        <DropDownButton text={`${inTheTop} место в топе`}>
            <div className={style.rating}>
                {list}
            </div>
        </DropDownButton>
    )
}
