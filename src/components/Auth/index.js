import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { CloseEmoji } from "../assets/emoji/close";
import { useFormik } from "formik";
import { SmartCaptcha } from '@yandex/smart-captcha';

const sitekey = "ysc1_nv8XuOek8E8YqHayE1DNu4rmsw5DTmQKO3C9ue6J79e51060"

const validate = values => {
    const errors = {};

    console.log(values)

    if (!values.login) {
        errors.login = "Это обязательное поле!"
    } else if (values.login.length > 30) {
        errors.login = "Не больше 30 символов"
    }

    if (!values.password) {
        errors.password = "Это обязательное поле!"
    } else if (values.login.length > 30) {
        errors.password = "Не больше 30 символов"
    }

    if (!values.tokenCaptcha) {
        errors.tokenCaptcha = "Это обязательное поле!"
    } else if (values.tokenCaptcha.length < 30) {
        errors.tokenCaptcha = "Это обязательное поле!"
    }
    console.log(errors)
    return errors;
};

const SignupForm = () => {
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            tokenCaptcha: '',
        },
        validate,
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={style.form}>
            <div className={style.lvl}>
                <label htmlFor="login">ИМЯ ПОЛЬЗОВАТЕЛЯ</label>
                <input
                    id="login"
                    name="login"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.login}
                />
                {formik.touched.login && formik.errors.login ? (
                    <div className={style.error}>{formik.errors.login}</div>
                ) : null}
            </div>

            <div className={style.lvl}>
                <label htmlFor="password">ПАРОЛЬ</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className={style.error}>{formik.errors.password}</div>
                ) : null}
            </div>

            <SmartCaptcha sitekey={sitekey} onSuccess={(t) => formik.values.tokenCaptcha = t} />
            {formik.touched.tokenCaptcha && formik.errors.tokenCaptcha ? (
                <div className={style.error}>{formik.errors.tokenCaptcha}</div>
            ) : null}

            <button type="submit">Submit</button>
        </form>
    );
};


const ChoiceMode = ({ modeReg, setModeReg }) => {
    return (
        <div className={style.choice}>
            {modeReg ?
                <>
                    <p className={style.one}>Есть аккаунт?</p>
                    <div className={style.buttonMode} onClick={() => setModeReg(false)}>
                        <p>Войти</p>
                    </div>
                </>
                :
                <>

                    <p className={style.one}>Нет аккаунта?</p>
                    <div className={style.buttonMode} onClick={() => setModeReg(true)}>
                        <p>Регистрация</p>
                    </div>
                </>
            }
        </div>
    )
}

export const AuthModule = ({ }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [modeReg, setModeReg] = useState(false);

    useEffect(() => {
        if (modalVisible) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [modalVisible]);

    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = 'auto';
    }

    return (
        <div className={style.shadow}>
            <div className={style.main}>
                <div className={style.close} onClick={() => setModalVisible(false)}>
                    <CloseEmoji />
                </div>
                <div className={style.mode}>
                    <img src="./assets/main/blue-nemo-tishka.png" alt="Тишка И Немо - привет" />
                    <ChoiceMode modeReg={modeReg} setModeReg={setModeReg} />
                </div>
                <div className={style.form}>
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}