import { Link } from "react-router-dom";
import { DropDownButton } from "../../pageHome/dropDownButton";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/authorization/auth.slice";
import { clearUser } from "../../../store/user/user.slice";

export const ProfileDrop = ({ button }) => {
    const user = useSelector(state => state.user);
    const nickname = user?.user?.nickname?.main
    const dispatch = useDispatch();

    return (
        <DropDownButton button={button} hidden={true}>
            <div className={style.drop}>
                <div className={style.profile}>
                    <Link reloadDocument to={`/${nickname}`}>{nickname}</Link>
                </div>
                <div className={style.logout}>
                    <a onClick={() => dispatch(logoutUser()).then(dispatch(clearUser()))}>Выйти</a>
                </div>
            </div >
        </DropDownButton >
    )
}