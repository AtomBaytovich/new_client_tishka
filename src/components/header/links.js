import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../api/context/auth.js";
import { ProfileDrop } from "./dropProfile/index.js";
import { useSelector } from "react-redux";

const ButtonOpenProfile = ({ className, text }) => {
    return (
        <a className={className}>{text}</a>
    )
}

export const Links = () => {
    const { stateAuth, setOpenAuth } = useContext(AuthContext);
    const user = useSelector(state => state.user);
    const nickname = user?.user?.nickname?.main
    return <>
        <li><Link to="/">Блокнот</Link></li>
        <li><Link to="/mopiks">Мопики</Link></li>
        {
            stateAuth.isAuthenticated ?
                <li>
                    <ProfileDrop
                        button={
                            <ButtonOpenProfile text={nickname} />
                        }
                    />
                </li> :
                <li onClick={() => setOpenAuth(true)}><a>Аккаунт</a></li>
        }
        <li><Link to="/about">О нас</Link></li>
    </>
}