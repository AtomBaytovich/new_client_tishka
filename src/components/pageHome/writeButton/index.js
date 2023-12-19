import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const WriteButton = () => {
    return (

        <div className={style.fon}>
            <Link to={"/"}>
                <div className={style.written}>
                    <p>Написать</p>
                </div>
            </Link>
        </div >

    )
}