import { useContext, useEffect } from "react";
import { Header } from "../../components/header";
import { Notes } from "../../components/pageNotes/notes";
import style from "./style.module.scss";
import { AuthContext } from "../../api/context/auth";
import { Loader } from "../../components/loader";
import { getMe } from "../../api/services/user";

export const PageNotes = () => {
    const { stateAuth } = useContext(AuthContext);
    useEffect(() => {
        getMe().then(res => console.log(res)).catch(err => console.log(err))
    }, [])

    if (stateAuth.isLoading) return <Loader />
    
    return (
        <div className={style.wrapper}>
            <Header />
            <Notes />
        </div>
    )
}