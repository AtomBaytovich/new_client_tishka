import { StringInfo } from "../stringInfo";
import style from "./style.module.scss";

export const CardMain = ({
    avatarSrc = "/assets/заглушка/nemo.png",
    nemo = "nemo1",
    aboutText = `Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. `,
    gender = "Мужской",
    loveYear = "Осень",
    loveTime = "Утро",
    isZ = "Да"
}) => {
    return (
        <div className={style.cardMain}>
            <div>
                <div className={style.avatar}>
                    <img src={avatarSrc} alt="Аватар бабаклава" />
                </div>
                <div className={style.nemo}><p>{nemo}</p></div>
            </div>
            <div className={style.info}>
                <StringInfo
                    srcImg={"./assets/profile/письмо.png"}
                    altImg="О себе картинка"
                    title={"О себе:"}
                    text={aboutText}
                />
                <StringInfo
                    srcImg={"./assets/profile/пол.png"}
                    altImg="Картинка пола ЛАМИНАААТ"
                    title={"Пол:"}
                    text={gender}
                />
                <StringInfo
                    srcImg={"./assets/profile/осень.png"}
                    altImg="Картинка осень... Пушкин"
                    title={"Любимое время года:"}
                    text={loveYear}
                />
                <StringInfo
                    srcImg={"./assets/profile/утро.png"}
                    altImg="Картинка сутки... Вампир"
                    title={"Любимое время суток:"}
                    text={loveTime}
                />
                <StringInfo
                    srcImg={"./assets/profile/спорт.png"}
                    altImg="Картинка спорт форевер"
                    title={"За зож?:"}
                    text={isZ}
                />
            </div>
        </div>
    )
}