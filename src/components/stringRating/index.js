import style from "./style.module.scss";

export const StringRating = ({ avatar = "./assets/заглушка/nemo.png", nickname, isFirst }) => {
    return (
        <div className={style.stringRating}>
            <div className={`${style.avatar}`}>
                {(isFirst ? <img className={style.first} src="./assets/smiles/home/crown.png" /> : undefined)}
                <img src={avatar} alt="База аватар" />
            </div>
            <p>{nickname}</p>
        </div>
    )
}