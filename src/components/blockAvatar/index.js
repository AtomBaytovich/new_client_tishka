import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const BlockAvatar = ({ avatar = <img src="./assets/заглушка/nemo.png" alt="аватарка" width={32} height={32} />, name = "немо 23" }) => {
    return (
        <Link reloadDocument to={`/${name}`} style={{ display: "block", width: "fit-content" }} className={style.main}>
            <div className={style.avatar}>
                {avatar}
                <p>
                    {name}
                </p>
            </div>
        </Link>
    )
}