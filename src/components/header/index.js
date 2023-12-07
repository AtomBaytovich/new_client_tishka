import { useContext } from "react";
import { AuthContext } from "../../api/context/auth.js";
import { BurgerMenu } from "./burgerMenu/index.js";
import style from "./style.module.scss";

export const Header = ({ backgroundColor = "#383752" }) => {
  const { isLoggedIn, setOpenAuth } = useContext(AuthContext);
  return (
    <div style={{ backgroundColor }}>
      <div className={style.header} >
        <p className={style.title}>КОМПИК ТИШКИ</p>
        <div className={style.burger}><BurgerMenu /></div>
        <ul className={style.links}>
          <li>Мопики</li>
          {
            isLoggedIn ?
              <li>Немо $</li> :
              <li onClick={() => setOpenAuth(true)}>Аккаунт</li>
          }
          <li>О нас</li>
        </ul>
      </div>
    </div >
  );
};
