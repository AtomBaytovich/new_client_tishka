import { Header } from "../../components/header";
import { Mopik } from "../../components/mopik";
import { SectionPurpose } from "../../components/pageAbout/sectionPurpose";
import { TopDropDown } from "../../components/pageHome/dropDownButton/rating";
import { RulesDropDown } from "../../components/pageHome/dropDownButton/rules";
import { SearchInput } from "../../components/seacrhInput";
import { WriteButton } from "../../components/pageHome/writeButton";
import style from "./style.module.scss";

const dataRatingUser = [
    { name: "немо 3", id: 3, isFirst: true, avatar: "" },
    { name: "немо 7", id: 7, isFirst: false, avatar: "" },
    { name: "немо 13", id: 13, isFirst: false, avatar: "" },
    { name: "немо 1", id: 1, isFirst: false, avatar: "" },
    { name: "немо 57", id: 57, isFirst: false, avatar: "" },
    { name: "немо 78", id: 78, isFirst: false, avatar: "" },
    { name: "немо 14", id: 14, isFirst: false, avatar: "" },
    { name: "немо 86", id: 86, isFirst: false, avatar: "" },
    { name: "немо 9", id: 9, isFirst: false, avatar: "" },
    { name: "немо 891", id: 891, isFirst: false, avatar: "" },
]

export const PageHome = () => {
    return (
        <div className={style.wrapper}>
            <Header />
            <div className={style.honey}>
                <RulesDropDown />
                <TopDropDown data={dataRatingUser} />
                <div className={style.lenta}>
                    <div className={style.otboynik}>
                        <div className={style.searchWriteBar}>
                            <SearchInput />
                            <WriteButton />
                        </div>
                        <div className={style.list}>
                            <Mopik
                                id={1}
                                title={"Как же хочется отдохнуть в Сибири"}
                                text={`Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. `}
                                countView={458}
                            />
                            <Mopik
                                id={2}
                                title={"Как же хочется отдохнуть в Сибири"}
                                text={`Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. `}
                                countView={458}
                            />
                            <Mopik
                                id={3}
                                title={"Как же хочется отдохнуть в Сибири"}
                                text={`Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. `}
                                countView={458}
                            />
                            <Mopik
                                id={4}
                                title={"Как же хочется отдохнуть в Сибири"}
                                text={`Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. `}
                                countView={458}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
