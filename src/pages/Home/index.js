import { Header } from "../../components/header";
import { RulesDropDown } from "../../components/pageHome/dropDownButton/rules";
import style from "./style.module.scss";

export const PageHome = () => {
    return (
        <div className={style.wrapper}>
            <Header />
            <RulesDropDown />
        </div>
    );
};
