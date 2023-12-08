import { Header } from "../../components/header";
import { CardMain } from "../../components/pageProfile/cardMain";
import { MyTopDropDown } from "../../components/pageProfile/myTop";
import { StataDropDown } from "../../components/pageProfile/statistics";
import style from "./style.module.scss";

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
    return (
        <div className={style.wrapper}>
            <Header />
            <div className={style.razm}>
                <MyTopDropDown data={dataRatingUser} />
                <StataDropDown />
                <CardMain />
            </div>
        </div>
    )
}