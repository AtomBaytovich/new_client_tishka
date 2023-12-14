import React, { useContext, useState } from "react";
import style from "./style.module.scss";
import { Links } from "../links";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../api/context/auth";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/authorization/auth.slice";
import { clearUser } from "../../../store/user/user.slice";

export const BurgerMenu = () => {
  const { stateAuth, setOpenAuth } = useContext(AuthContext);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const nickname = user?.user?.nickname?.main
  return (
    <div className={`${style.burger__menu} ${isOpen ? `${style.open}` : ""}`}>
      <div className={style.burger__icon} onClick={toggleMenu}>
        <div className={style.line}></div>
        <div className={style.line}></div>
        <div className={style.line}></div>
      </div>
      <div className={`${style.menu__items}`}>
        <ul>
          <li><Link to="/">Блокнот</Link></li>
          <li><Link to="/mopiks">Мопики</Link></li>
          <li><Link to="/about">О нас</Link></li>
          {
            stateAuth.isAuthenticated ?
              <>
                <li>
                  <Link to={`/${nickname}`}>{nickname}</Link>
                </li>
                <li>
                  <a
                    onClick={() =>
                      dispatch(logoutUser())
                        .then(dispatch(clearUser()))
                    }
                  >Выход</a>
                </li>
              </> :
              <li onClick={() => setOpenAuth(true)}><a>Аккаунт</a></li>
          }
        </ul>
      </div>
    </div>
  );
};
