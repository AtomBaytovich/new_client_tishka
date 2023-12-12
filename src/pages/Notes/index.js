import { useContext, useEffect } from "react";
import { Header } from "../../components/header";
import { Notes } from "../../components/pageNotes/notes";
import style from "./style.module.scss";
import { AuthContext } from "../../api/context/auth";

export const PageNotes = () => {
    const { isLoggedIn, login, logout, checkAuthC, isLoading  } = useContext(AuthContext);
    useEffect(() => {
        checkAuthC()
    }, [])
    if (isLoading) return <div>Загрузка</div>
    return (
        <div className={style.wrapper}>
            <Header />
            {isLoggedIn ? <div>Ты авторизован БРОООО</div> : <div>NO auth HAHAHHA</div>}
            <Notes />
        </div>
    )
}