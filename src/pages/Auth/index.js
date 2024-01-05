import { useSelector } from "react-redux";
import { AuthModule } from "../../components/Auth";
import { Header } from "../../components/header";
import style from "./style.module.scss";
import { useNavigate } from 'react-router-dom';
import { Loader } from "../../components/loader";
import { useEffect } from "react";


export const PageAuth = () => {
    const stateAuth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (stateAuth.isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [stateAuth.isAuthenticated]);

    if (stateAuth.isLoading) return <Loader />;

    return (
        <div className={style.wrapper}>
            <Header />
            <div className={`${style.main} ${style.fadeIn}`}>
                <AuthModule />
            </div>
        </div>
    )
}