import { DropDownButton } from "..";
import { StringRating } from "../../../stringRating";
import style from "./style.module.scss";


export const TopDropDown = ({ data }) => {
    let list = data.map((el) => {
        return (<StringRating nickname={el.nickname} key={el.id} />)
    })
    return (
        <DropDownButton text={"Последние мопнувшие"}>
            <div className={style.rating}>
                {list}
                {data.length == 0 && <p className={style.nikto}>Сейчас пока что никто не писал</p>}
            </div>
        </DropDownButton>
    )
}