import style from "./style.module.scss";

export const CardMain = ({
    avatarSrc = "/assets/заглушка/nemo.png",
    nemo = "nemo1",
    aboutText = `Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. `
}) => {
    return (
        <div className={style.cardMain}>
            <div className={style.avatar}>
                <img src={avatarSrc} alt="Аватар бабаклава" />
            </div>
            <div className={style.nemo}><p>{nemo}</p></div>
            <div className={style.info}>
                <div className={style.about}>
                    <div className={style.group}>
                        <img src="./assets/profile/письмо.png" alt="О себе картинка" />
                        <p>О себе:</p>
                    </div>
                    <p className={style.text}>{aboutText}</p>
                </div>
            </div>
        </div>
    )
}