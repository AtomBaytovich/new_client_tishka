import { useEffect, useRef, useState } from "react";
import { CloseEmoji } from "../../assets/emoji/close";
import { RadioButton } from "../../radiobutton";
import style from "./style.module.scss";
import { editProfile } from "../../../api/services/user";

export const EditProfile = ({
    onClose = () => { },
    defaultGender,
    defaultTimeYear,
    defaultTimeDay,
    defaultHealthyLifestyle
}) => {
    const [text, setText] = useState("")
    const [gender, setGender] = useState(defaultGender)
    const [timeYear, setTimeYear] = useState(defaultTimeYear)
    const [timeDay, setTimeDay] = useState(defaultTimeDay)
    const [healthyLifestyle, setHealthyLifestyle] = useState(defaultHealthyLifestyle)

    const inputRef = useRef()

    const updateEditProfile = (name, value) => {
        let data = {};
        if (name == "gender") {
            setGender(value)
            data = {
                "gender": value
            }
        }
        if (name == "timeYear") {
            setTimeYear(value)
            data = {
                "timeYear": value
            }
        }

        if (name == "timeDay") {
            setTimeDay(value)
            data = {
                "timeDay": value
            }
        }

        if (name == "healthyLifestyle") {
            setHealthyLifestyle(value)
            data = {
                "healthyLifestyle": value == "Да" ? true : false
            }
        }
        console.log(data)

        if (Object.keys(data).length !== 0) {
            editProfile({ ...data })
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
    }

    const write = ({ text }) => {
        if (text.length <= 250) {
            setText(text)
        } else {
            // сделать чтобы нельзя было писать
        }
    }
    return (
        <div className={style.shadow}>
            <div className={style.main}>
                <div className={style.close} onClick={onClose}>
                    <CloseEmoji />
                </div>
                <div className={style.list}>
                    <div className={style.elementBox}>
                        <p className={style.title}>Выбери пол</p>
                        <div className={style.box}>
                            <RadioButton text={"Мужской"} id={"male"} name={"gender"} value={"Мужской"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"Женский"} id={"female"} name={"gender"} value={"Женский"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"Неважно"} id={"nomatter"} name={"gender"} value={"Неважно"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                        </div>
                    </div>
                    <div className={style.elementBox}>
                        <p className={style.title}>Любимое время года</p>
                        <div className={style.box}>
                            <RadioButton text={"Лето"} id={"summer"} name={"timeYear"} value={"Лето"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"Осень"} id={"autumn"} name={"timeYear"} value={"Осень"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"Зима"} id={"winter"} name={"timeYear"} value={"Зима"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"Весна"} id={"spring"} name={"timeYear"} value={"Весна"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                        </div>
                    </div>
                    <div className={style.elementBox}>
                        <p className={style.title}>Любимое время суток</p>
                        <div className={style.box}>
                            <RadioButton text={"Утро"} id={"morning"} name={"timeDay"} value={"Утро"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"День"} id={"day"} name={"timeDay"} value={"День"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"Вечер"} id={"evening"} name={"timeDay"} value={"Вечер"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"Ночь"} id={"night"} name={"timeDay"} value={"Ночь"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                        </div>
                    </div>
                    <div className={style.elementBox}>
                        <p className={style.title}>За зож?</p>
                        <div className={style.box}>
                            <RadioButton text={"Да"} id={"yes"} name={"healthyLifestyle"} value={"Да"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                            <RadioButton text={"Нет"} id={"no"} name={"healthyLifestyle"} value={"Нет"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} />
                        </div>
                    </div>

                    <div className={style.elementBox}>
                        <div className={style.write}>
                            <div
                                onInput={(e) => write({ text: e.currentTarget.textContent })}
                                ref={inputRef}
                                placeholder={"Начни писать..."}
                                className={style.textareaElement}
                                contentEditable={true}
                            // onFocus={() => setFocus(true)}
                            >
                            </div>
                            <div className={style.ogr}>{text.length}/250</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}