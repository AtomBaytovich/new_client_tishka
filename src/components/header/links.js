import { Link, useLocation } from "react-router-dom"
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
    const { stateAuth } = useContext(AuthContext);
    const location = useLocation();
    const currentUrl = location.pathname;
    // console.log(currentUrl);
    const user = useSelector(state => state.user);
    const nickname = user?.user?.nickname?.main
    return <>
        <li><Link to="/" style={currentUrl === "/" ? { color: "#75BD4E" } : {}}>Блокнот</Link></li>
        <li><Link to="/mopiks" style={currentUrl === "/mopiks" ? { color: "#75BD4E" } : {}}>Мопики</Link></li>
        {
            stateAuth.isAuthenticated ?
                <li>
                    <ProfileDrop
                        button={
                            <ButtonOpenProfile text={nickname} />
                        }
                    />
                </li> :
                <li><Link to="/auth" style={currentUrl === "/auth" ? { color: "#75BD4E" } : {}}>Аккаунт</Link></li>
        }
        <li><Link to="/about" style={currentUrl === "/about" ? { color: "#404040" } : {}}>О нас</Link></li>
    </>
}