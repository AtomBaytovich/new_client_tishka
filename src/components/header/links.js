import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../api/context/auth.js";
import { ProfileDrop } from "./dropProfile/index.js";

const ButtonOpenProfile = ({ className, text }) => {
    return (
        <a className={className}>{text}</a>
    )
}

export const Links = () => {
    const { stateAuth, setOpenAuth } = useContext(AuthContext);

    return <>
        <li><Link to="/">Блокнот</Link></li>
        <li><Link to="/mopiks">Мопики</Link></li>
        {
            stateAuth.isAuthenticated ?
                <li>
                    <ProfileDrop
                        button={
                            <ButtonOpenProfile text={"Немо 1"} />
                        }
                    />
                </li> :
                <li onClick={() => setOpenAuth(true)}><a>Аккаунт</a></li>
        }
        <li><Link to="/about">О нас</Link></li>
    </>
}