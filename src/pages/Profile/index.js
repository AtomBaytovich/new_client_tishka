import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { CardMain } from "../../components/pageProfile/cardMain";
import { MyTopDropDown } from "../../components/pageProfile/myTop";
import { SelectMopiks } from "../../components/pageProfile/selectMopiks";
import { StataDropDown } from "../../components/pageProfile/statistics";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../../components/loader";
import { getProfile } from "../../api/services/profile";

const dataRatingUser = [
    { name: "немо 3", id: 3, isFirst: false, avatar: "" },
    { name: "немо 7", id: 7, isFirst: false, avatar: "" },
    { name: "немо 13", id: 13, isFirst: false, avatar: "" },
    { name: "немо 1", id: 1, isFirst: false, avatar: "" },
    { name: "немо 57", id: 57, isFirst: false, avatar: "" },
    { name: "немо 78", id: 78, isFirst: true, avatar: "" },
    { name: "немо 14", id: 14, isFirst: false, avatar: "" },
    { name: "немо 86", id: 86, isFirst: false, avatar: "" },
    { name: "немо 9", id: 9, isFirst: false, avatar: "" },
    { name: "немо 891", id: 891, isFirst: false, avatar: "" },
]

export const PageProfile = () => {
    const stateAuth = useSelector((state) => state.auth);
    const stateUser = useSelector((state) => state.user);

    const [data, setData] = useState({
        isLoading: true,
        isError: undefined,
        user: {},
        isI: undefined
    })
    const params = useParams();

    useEffect(() => {
        const nemo = params.nemo;
        console.log(stateUser)
        if (stateUser.isLoading == false) {
            if (nemo == stateUser.user?.nickname?.main) {
                return setData(v => ({
                    ...v,
                    isLoading: false,
                    isError: undefined,
                    user: stateUser.user,
                    isI: true
                }))
            }
            getProfile({ nickname: nemo })
                .then(res => {
                    console.log(res)
                    setData(v => ({
                        ...v,
                        isLoading: false,
                        isError: undefined,
                        user: res.user,
                        isI: false
                    }))
                })
                .catch(err => {
                    console.log(err)
                    setData(v => ({
                        ...v,
                        isLoading: false,
                        isError: v,
                        user: {},
                        isI: false
                    }))
                })
        }
    }, [stateAuth.isLoading, stateUser.isLoading, params.nemo])

    if (stateAuth.isLoading || data.isLoading) return <Loader />

    return (
        <div className={style.wrapper}>
            <Header />
            <div className={style.razm}>
                <div className={style.block}>
                    <MyTopDropDown data={dataRatingUser} />
                    <StataDropDown />
                </div>
                <div className={style.lenta}>
                    <CardMain nemo={data.user.nickname.main} data={data} />
                    <SelectMopiks />
                </div>
            </div>
        </div>
    )
}