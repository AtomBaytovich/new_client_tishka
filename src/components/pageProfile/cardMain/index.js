import { EditProfile } from "../edit";
import { StringInfo } from "../stringInfo";
import style from "./style.module.scss";

export const CardMain = ({
    avatarSrc = "/assets/заглушка/nemo.png",
    nemo,
    aboutText,
    gender,
    loveYear,
    loveTime,
    isZ,
    data,
    onClickRed = () => { }
}) => {
    return (
        <div className={style.cardMain}>
            <div>
                <div className={style.avatar}>
                    <img src={avatarSrc} alt="Аватар бабаклава" />
                </div>
                <div className={style.nemo}><p>{nemo}</p></div>
                {data.isI &&
                    <div className={style.red} onClick={onClickRed}>
                        <img src="/assets/notes/pencil.png" />
                    </div>
                }
            </div>
            <div className={style.info}>
                {aboutText && <StringInfo
                    srcImg={"./assets/profile/письмо.png"}
                    altImg="О себе картинка"
                    title={"О себе:"}
                    text={aboutText}
                />}
                {gender && <StringInfo
                    srcImg={"./assets/profile/пол.png"}
                    altImg="Картинка пола ЛАМИНАААТ"
                    title={"Пол:"}
                    text={gender}
                />}
                {loveYear && <StringInfo
                    srcImg={"./assets/profile/осень.png"}
                    altImg="Картинка осень... Пушкин"
                    title={"Любимое время года:"}
                    text={loveYear}
                />}
                {loveTime && <StringInfo
                    srcImg={"./assets/profile/утро.png"}
                    altImg="Картинка сутки... Вампир"
                    title={"Любимое время суток:"}
                    text={loveTime}
                />}
                {isZ && <StringInfo
                    srcImg={"./assets/profile/спорт.png"}
                    altImg="Картинка спорт форевер"
                    title={"За зож?:"}
                    text={isZ}
                />}

            </div>
        </div>
    )
}