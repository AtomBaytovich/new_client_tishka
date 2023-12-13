import { Link } from "react-router-dom";
import { DropDownButton } from "../../pageHome/dropDownButton";
import style from "./style.module.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/authorization/auth.slice";

export const ProfileDrop = ({ button }) => {
    const dispatch = useDispatch();

    return (
        <DropDownButton button={button} hidden={true}>
            <div className={style.drop}>
                <div className={style.profile}>
                    <Link to={`/`}>Немо 1</Link>
                </div>
                <div className={style.logout}>
                    <a onClick={() => dispatch(logoutUser())}>Выйти</a>
                </div>
            </div >
        </DropDownButton >
    )
}