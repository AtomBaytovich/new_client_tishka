import { Header } from "../../components/header";
import { TopDropDown } from "../../components/pageHome/dropDownButton/rating";
import { RulesDropDown } from "../../components/pageHome/dropDownButton/rules";

import style from "./style.module.scss";
import { Loader } from "../../components/loader";
import { useSelector } from "react-redux";
import { ListMopiks } from "../../components/pageHome/list";
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export const PageHome = () => {
    const stateAuth = useSelector((state) => state.auth);
    const [createMopiksNow, setCreateMopiksNow] = useState([])

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_HOST_SERVER);  // Укажите адрес вашего Express.js сервера
        // Слушаем событие 'new record' от сервера
        socket.on("recordCreated", (newRecord) => {
            setCreateMopiksNow(prev => {
                if (prev.length > 9) prev.pop();
                return [newRecord, ...prev]
            })
        });
        // Отключение соединения при размонтировании компонента
        return () => {
            socket.disconnect();
        };
    }, [])

    if (stateAuth.isLoading) return <Loader />

    return (
        <div className={style.wrapper}>
            <Helmet>
                <title>Просмотр мопиков | КТ</title>
            </Helmet>
            <Header />
            <div className={style.honey}>
                <RulesDropDown />
                <TopDropDown data={createMopiksNow} />
                <div className={style.lenta}>
                    <div className={style.otboynik}>
                        {/* <div className={style.searchWriteBar}>
                            <SearchInput />
                            <WriteButton />
                        </div> */}
                        <ListMopiks />
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};
