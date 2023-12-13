import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../api/context/auth.js";

export const Links = () => {
    const { isLoggedIn, setOpenAuth } = useContext(AuthContext);
    return <>
        <li><Link to="/">Блокнот</Link></li>
        <li><Link to="/mopiks">Мопики</Link></li>
        {
            isLoggedIn ?
                <li><a>Немо $</a></li> :
                <li onClick={() => setOpenAuth(true)}><a>Аккаунт</a></li>
        }
        <li><Link to="/about">О нас</Link></li>
    </>
}