import { Header } from "../../components/header";
import { Notes } from "../../components/pageNotes/notes";
import style from "./style.module.scss";
import { Loader } from "../../components/loader";
import { useSelector } from "react-redux";
import { PlugNotes } from "../../components/pageNotes/plugNotes";

export const PageNotes = () => {
    const stateAuth = useSelector((state) => state.auth);
    if (stateAuth.isLoading) return <Loader />

    return (
        <div className={style.wrapper}>
            <Header />
            {stateAuth.isAuthenticated ?
                <Notes />
                :
                <PlugNotes />
            }
        </div>
    )
}