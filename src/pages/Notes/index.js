import { Header } from "../../components/header";
import { Notes } from "../../components/pageNotes/notes";
import style from "./style.module.scss";

export const PageNotes = () => {
    return (
        <div className={style.wrapper}>
            <Header />
            <Notes />
        </div>
    )
}