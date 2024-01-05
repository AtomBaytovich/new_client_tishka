import { Footer } from "../../components/footer";
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
        <Header backgroundColor="rgba(0,0,0,0.0)" />
        <SectionHello />
      </div>
      <SectionWhat />
      <SectionWork />
      <SectionPurpose
        answerMob={"Дать возможность почувстовать себя нужным, свободным и открытым, не раскрывая при этом личности"}
        text={"Однажды глубокой осенью 2022 года я захотел поделиться своими мыслями, переживаниями с кем- то.... Но такой возможности у меня не оказалось, да и вряд ли моим знакомым можно было такое рассказывать"}
        img={"./assets/main/volodya-top.png"}
      />

      <SectionPurpose
        answerMob={"Прийти к внутреннему равновесию и безопасно делиться информацией без ебучих мыслей «я не готов выслушивать осуждение»"}
        text={"Летом 2023 года я услышала про этот проект и загорелась идеей. У меня, как и у многих на тот момент, не было рядом человека которому можно было рассказать о своих чувствах, Есть вещи, которые люди просто не понимают, а хоронить это в себе очень не хочется...."}
        img={"./assets/main/nemo.png"}
        reverse={true} />
      <Footer />
    </div>
  );
};
