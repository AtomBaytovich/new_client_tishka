import { Header } from "../../components/header";
import { SectionHello } from "../../components/pageAbout/sectionHello";
import { SectionPurpose } from "../../components/pageAbout/sectionPurpose";
import { SectionWhat } from "../../components/pageAbout/sectionWhat";
import { SectionWork } from "../../components/pageAbout/sectionWork";
import style from "./style.module.scss";

export const PageAbout = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.sectionCustom}>
        <Header />
        <SectionHello />
      </div>
      <SectionWhat />
      <SectionWork />
      <SectionPurpose />
    </div>
  );
};
