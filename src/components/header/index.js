import { BurgerMenu } from "./burgerMenu/index.js";
import style from "./style.module.scss";

export const Header = () => {
  return (
    <div className={style.header}>
      <p className={style.title}>КОМПИК ТИШКИ</p>
      <div className={style.burger}><BurgerMenu/></div>
      <ul className={style.links}>
          <li>Мопики</li>
          <li>Аккаунт</li>
          <li>О нас</li>
        </ul>
    </div>
  );
};
