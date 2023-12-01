import { Header } from "../../components/header";
import { SectionPurpose } from "../../components/pageAbout/sectionPurpose";
import { TopDropDown } from "../../components/pageHome/dropDownButton/rating";
import { RulesDropDown } from "../../components/pageHome/dropDownButton/rules";
import { SearchInput } from "../../components/pageHome/seacrhInput";
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
                {/* <div style={{gridArea: "q"}}> */}
                <RulesDropDown />
                {/* </div> */}
                {/* <div style={{gridArea: "z"}}> */}
                <TopDropDown data={dataRatingUser} />
                {/* </div> */}
                <div className={style.lenta} /*style={{gridArea: "a"}}*/>
                    <div className={style.searchWriteBar}>
                        <SearchInput />
                        <WriteButton />
                    </div>
                    {/* <SectionPurpose /> */}
                </div>
            </div>
        </div>
    );
};
