import { DropDownButton } from "../../pageHome/dropDownButton";
import style from "./style.module.scss";

export const MyAdminDropDown = ({ onBanned = () => { }, onBannedMopiks = () => { }, isBanned = false, statusAdm }) => {

    return (
        <DropDownButton text={`Администрирование немо`}>
            <div className={style.adm}>
                <p className={style.message}>{statusAdm}</p>
                {isBanned ?
                    <div className={style.banned}>Уже забанен</div>
                    :
                    <>
                        <div className={style.banned} onClick={() => onBanned()}>Забанить</div>
                        <div className={style.banned} onClick={() => onBannedMopiks()}>Бан комментарии и мопики</div>
                    </>
                }
            </div>
        </DropDownButton>
    )
}
