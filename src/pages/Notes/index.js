import { useContext, useEffect } from "react";
import { Header } from "../../components/header";
import { Notes } from "../../components/pageNotes/notes";
import style from "./style.module.scss";
import { AuthContext } from "../../api/context/auth";
import { Loader } from "../../components/loader";

export const PageNotes = () => {
    const { stateAuth } = useContext(AuthContext);

    if (stateAuth.isLoading) return <Loader />

    return (
        <div className={style.wrapper}>
            <Header />
            {stateAuth.isAuthenticated ? <Notes /> : <div>Авторизауйся, что пользоваться этим функционалом :)</div>}
            
        </div>
    )
}