import { BurgerMenu } from "./burgerMenu/index.js";
import { Links } from "./links.js";
import style from "./style.module.scss";

export const Header = ({ backgroundColor = "#383752" }) => {
  return (
    <div style={{ backgroundColor }}>
      <div className={style.header} >
        <p className={style.title}>КОМПИК ТИШКИ</p>
        <div className={style.burger}><BurgerMenu /></div>
        <ul className={style.links}>
          <Links />
        </ul>
      </div>
    </div >
  );
};
