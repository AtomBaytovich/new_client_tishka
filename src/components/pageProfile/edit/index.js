import { useEffect, useRef, useState } from "react";
import { CloseEmoji } from "../../assets/emoji/close";
import { RadioButton } from "../../radiobutton";
import style from "./style.module.scss";
import { editProfile } from "../../../api/services/user";
import { MiniLoader } from "../../pageNotes/miniLoader";

export const EditProfile = ({
    onClose = () => { },
    defaultGender,
    defaultTimeYear,
    defaultTimeDay,
    defaultHealthyLifestyle,
    defaultStatus
}) => {
    const [isLoading, setLoading] = useState(true)
    const [text, setText] = useState(defaultStatus)
    const [gender, setGender] = useState(defaultGender)
    const [timeYear, setTimeYear] = useState(defaultTimeYear)
    const [timeDay, setTimeDay] = useState(defaultTimeDay)
    const [healthyLifestyle, setHealthyLifestyle] = useState(defaultHealthyLifestyle)
    const [focus, setFocus] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.innerText = defaultStatus || "";
        setLoading(false)
    }, [])

    useEffect(() => {
        if (focus) {
            let typingTimer;
            const delay = 800;
            const sendData = () => {
                updateEditProfile("text", text)
            }
            typingTimer = setTimeout(sendData, delay);
            return () => {
                clearTimeout(typingTimer);
            }
        }
    }, [focus, text])

    const updateEditProfile = (name, value) => {
        setLoading(true)
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

        if (name == "text") {
            data = {
                "status": text
            }
        }
        if (Object.keys(data).length !== 0) {
            editProfile({ ...data })
                .then()
                .catch()
                .finally(() => setLoading(false))
        }
    }

    const write = ({ e }) => {
        let inputText = e.currentTarget.textContent;

        if (inputText.length <= 220) {
            setText(inputText)
        } else {
            e.preventDefault()
            e.currentTarget.textContent = text;
            // сделать чтобы нельзя было писать
        }
    }

    const oprDefaultChecked = ({ value, op }) => {
        if (value == op) return true;
        else return false
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
                            <RadioButton text={"Мужской"} id={"male"} name={"gender"} value={"Мужской"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Мужской", op: gender })} />
                            <RadioButton text={"Женский"} id={"female"} name={"gender"} value={"Женский"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Женский", op: gender })} />
                            <RadioButton text={"Неважно"} id={"nomatter"} name={"gender"} value={"Неважно"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Неважно", op: gender })} />
                        </div>
                    </div>
                    <div className={style.elementBox}>
                        <p className={style.title}>Любимое время года</p>
                        <div className={style.box}>
                            <RadioButton text={"Лето"} id={"summer"} name={"timeYear"} value={"Лето"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Лето", op: timeYear })} />
                            <RadioButton text={"Осень"} id={"autumn"} name={"timeYear"} value={"Осень"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Осень", op: timeYear })} />
                            <RadioButton text={"Зима"} id={"winter"} name={"timeYear"} value={"Зима"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Зима", op: timeYear })} />
                            <RadioButton text={"Весна"} id={"spring"} name={"timeYear"} value={"Весна"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Весна", op: timeYear })} />
                        </div>
                    </div>
                    <div className={style.elementBox}>
                        <p className={style.title}>Любимое время суток</p>
                        <div className={style.box}>
                            <RadioButton text={"Утро"} id={"morning"} name={"timeDay"} value={"Утро"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Утро", op: timeDay })} />
                            <RadioButton text={"День"} id={"day"} name={"timeDay"} value={"День"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "День", op: timeDay })} />
                            <RadioButton text={"Вечер"} id={"evening"} name={"timeDay"} value={"Вечер"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Вечер", op: timeDay })} />
                            <RadioButton text={"Ночь"} id={"night"} name={"timeDay"} value={"Ночь"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Ночь", op: timeDay })} />
                        </div>
                    </div>
                    <div className={style.elementBox}>
                        <p className={style.title}>За зож?</p>
                        <div className={style.box}>
                            <RadioButton text={"Да"} id={"yes"} name={"healthyLifestyle"} value={"Да"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Да", op: healthyLifestyle })} />
                            <RadioButton text={"Нет"} id={"no"} name={"healthyLifestyle"} value={"Нет"} onChange={(e) => updateEditProfile(e.target.name, e.target.value)} defaultChecked={oprDefaultChecked({ value: "Нет", op: healthyLifestyle })} />
                        </div>
                    </div>

                    <div className={style.elementBox}>
                        <div className={style.write}>
                            <div
                                onInput={(e) => write({ text: e.currentTarget.textContent, e })}
                                ref={inputRef}
                                placeholder={"Начни писать..."}
                                className={style.textareaElement}
                                contentEditable={true}
                                onFocus={() => setFocus(true)}
                            >
                            </div>
                            <div className={style.ogr}>
                                <p style={text.length >= 220 ? { color: "#ff8686" } : undefined}>{text.length}</p>/250
                            </div>
                        </div>
                    </div>
                    {isLoading && <div className={style.loader}> <MiniLoader /> </div>}
                </div>
            </div>
        </div>
    )
}