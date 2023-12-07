import React, { useContext, useState } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../../../api/context/auth";

export const BurgerMenu = () => {
  const { isLoggedIn, setOpenAuth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${style.burger__menu} ${isOpen ? `${style.open}` : ""}`}>
      <div className={style.burger__icon} onClick={toggleMenu}>
        <div className={style.line}></div>
        <div className={style.line}></div>
        <div className={style.line}></div>
      </div>
      <div className={`${style.menu__items}`}>
        <ul>
        <li><a href="/">Мопики</a></li>
          {
            isLoggedIn ?
              <li><a>Немо $</a></li> :
              <li onClick={() => setOpenAuth(true)}><a>Аккаунт</a></li>
          }
          <li><a href="/about">О нас</a></li>
        </ul>
      </div>
    </div>
  );
};
