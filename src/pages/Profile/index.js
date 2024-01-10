import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { CardMain } from "../../components/pageProfile/cardMain";
import { SelectMopiks } from "../../components/pageProfile/selectMopiks";
import { StataDropDown } from "../../components/pageProfile/statistics";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../../components/loader";
import { getProfile } from "../../api/services/profile";
import { EditProfile } from "../../components/pageProfile/edit";
import { getStataProfile } from "../../api/services/stata";
import { Helmet } from "react-helmet-async";
import { MyAdminDropDown } from "../../components/pageProfile/adm";
import { banMopiks, banUser } from "../../api/services/adm";


export const PageProfile = () => {
    const stateAuth = useSelector((state) => state.auth);
    const stateUser = useSelector((state) => state.user);
    const [stata, setStata] = useState({})
    const [modal, setModal] = useState(false)
    const [statusAdm, setStatusAdm] = useState(undefined)

    const [data, setData] = useState({
        isLoading: true,
        isError: undefined,
        user: {},
        isI: undefined
    })
    const params = useParams();

    useEffect(() => {
        const nemo = params.nemo;
        // console.log(stateUser)
        if (stateUser.isLoading == false) {
            getStataProfile({ nickname: nemo })
                .then(res => {
                    // console.log(res.data)
                    const data = res.data;
                    setStata({
                        dateReg: data.userCreatedAt,
                        countMopiks: data.countMopiks,
                        countViewMopiks: data.countView,
                        firstDateMopik: data.firstMopikDate,
                        lastDateMopik: data.lastMopikDate
                    })
                })
                .catch(err => {
                    console.log(err)
                })
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
                        isError: err,
                        user: {},
                        isI: false
                    }))
                })
        }
    }, [stateAuth.isLoading, stateUser.isLoading, params.nemo])

    const oprZo = () => {
        if (data.user?.data?.healthyLifestyle == undefined) return undefined
        return (data.user?.data?.healthyLifestyle ? "Да" : "Нет")
    }

    const oprAdm = () => {
        if (stateUser.user?.isAdmin == true) {
            if (data.user?._id !== stateUser.user?._id) {
                return true
            }
        }
        return false;
    }

    if (stateAuth.isLoading || data.isLoading) return <Loader />

    return (
        <div className={style.wrapper}>
            <Header />
            {data.isError?.response?.status == 404 ? <>
                <Helmet>
                    <title>Такой страницы нет | КТ</title>
                </Helmet>
                <p>Такой страницы не существует</p>
            </>
                :
                <>
                    <Helmet>
                        <title>{data.user?.nickname?.main} | КТ</title>
                    </Helmet>
                    <div className={style.razm}>
                        <div className={style.block}>
                            <StataDropDown
                                dateReg={stata?.dateReg}
                                countMopiks={stata?.countMopiks}
                                countViewMopiks={stata?.countViewMopiks}
                                firstDateMopik={stata?.firstDateMopik}
                                lastDateMopik={stata?.lastDateMopik}
                            />
                            {oprAdm() && <MyAdminDropDown
                                onBanned={() => banUser(data.user?.nickname?.main)
                                    .then(res => setStatusAdm(res?.message))
                                    .catch(err => setStatusAdm(err?.response?.data?.message))
                                }
                                onBannedMopiks={() => banMopiks(data.user?.nickname?.main)
                                    .then(res => setStatusAdm(res?.message))
                                    .catch(err => setStatusAdm(err?.response?.data?.message))
                                }
                                isBanned={data.user?.isBanned}
                                statusAdm={statusAdm}
                            />}
                        </div>
                        <div className={style.lenta}>
                            <CardMain
                                nemo={data.user.nickname.main}
                                gender={data.user?.data?.gender}
                                loveYear={data.user?.data?.timeYear}
                                loveTime={data.user?.data?.timeDay}
                                isZ={oprZo()}
                                data={data}
                                onClickRed={() => setModal(true)}
                                aboutText={data.user?.data?.status}
                            />
                            <SelectMopiks nick={data.user.nickname.main} />
                            {modal && <EditProfile
                                onClose={() => setModal(false)}
                                defaultGender={data.user?.data?.gender}
                                defaultTimeDay={data.user?.data?.timeDay}
                                defaultTimeYear={data.user?.data?.timeYear}
                                defaultHealthyLifestyle={oprZo()}
                                defaultStatus={data.user?.data?.status}
                            />}
                        </div>
                    </div>
                </>
            }

        </div>
    )
}