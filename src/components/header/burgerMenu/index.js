import React, { useContext, useState } from "react";
import style from "./style.module.scss";
import { Links } from "../links";

export const BurgerMenu = () => {
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
          <Links />
        </ul>
      </div>
    </div>
  );
};
