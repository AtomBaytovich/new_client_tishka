import { Header } from "../../components/header";
import { RevealMeDropDown } from "../../components/pageCreateMopik/revealMe";
import style from "./style.module.scss";

export const PageCreateMopik = () => {
    return (
        <div className={style.wrapper}>
            <Header />
            <div className={style.main}>
                <RevealMeDropDown />
            </div>
        </div>
    )
}