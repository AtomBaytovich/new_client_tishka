import { DropDownButton } from "..";
import style from "./style.module.scss";

const StringRating = ({ avatar = "./assets/заглушка/avatar.png", name, isFirst }) => {
    return (
        <div className={style.stringRating}>
            <div className={`${style.avatar}`}>
                {(isFirst ? <img className={style.first} src="./assets/smiles/home/crown.png" /> : undefined)}
                <img src={avatar} alt="База аватар" />
            </div>
            <p>{name}</p>
        </div>
    )
}

export const TopDropDown = ({ data }) => {
    console.log(data)
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