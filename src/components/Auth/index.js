import { useCallback, useContext, useEffect, useState } from "react";
import style from "./style.module.scss";
import { CloseEmoji } from "../assets/emoji/close";
import { useFormik } from "formik";
import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { AuthContext } from "../../api/context/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser, registerUser } from "../../store/authorization/auth.slice";
import { getUserMe } from "../../store/user/user.slice";

const sitekey = process.env.REACT_APP_SECRET_CAPTHCA;

const validate = values => {
    const errors = {};

    if (!values.login) {
        errors.login = "Это обязательное поле!"
    } else if (values.login.length > 30) {
        errors.login = "Не больше 30 символов"
    } else if (values.login.length < 8) {
        errors.login = "Не меньше 8 символов"
    }

    if (!values.password) {
        errors.password = "Это обязательное поле!"
    } else if (values.password.length > 30) {
        errors.password = "Не больше 30 символов"
    } else if (values.password.length < 8) {
        errors.password = "Не меньше 8 символов"
    }

    if (!values.tokenCaptcha) {
        errors.tokenCaptcha = "Это обязательное поле!"
    } else if (values.tokenCaptcha.length < 30) {
        errors.tokenCaptcha = "Это обязательное поле!"
    }

    return errors;
};

const Form = ({ modeReg }) => {
    const [visible, setVisible] = useState(false);
    const state = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [resetCaptcha, setResetCaptcha] = useState(0);

    const handleReset = () => setResetCaptcha((prev) => prev + 1);
    const handleChallengeHidden = useCallback(() => setVisible(false), []);
    const handleButtonClick = () => {
        setVisible(true);
    }

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            tokenCaptcha: '',
        },
        validate,
        onSubmit: values => {
            console.log(values)
            if (modeReg) {
                dispatch(registerUser({
                    login: values.login,
                    password: values.password,
                    captcha: values.tokenCaptcha
                }))
                    .unwrap()
                    .then(() => dispatch(getUserMe()))
                    .catch(err => {
                        handleReset()
                        console.log(err)
                    })

            } else {
                dispatch(loginUser({
                    login: values.login,
                    password: values.password,
                    captcha: values.tokenCaptcha
                }))
                    .unwrap()
                    .then(() => dispatch(getUserMe()))
                    .catch(err => {
                        handleReset()
                        console.log(err)
                    })
            }
        },
    });

    useEffect(() => {
        return () => dispatch(clearError())
    }, [])

    return (
        <form onSubmit={formik.handleSubmit} className={style.form}>
            {/* <div> */}
            {state.isLoadingAuth === false && state.error ? (<p className={style.error}>{state.error}</p>) : <></>}
            {state.isLoadingAuth && <p className={style.loading}>Загрузка...</p>}
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
                    <p className={style.error}>{formik.errors.login}</p>
                ) : null}
            </div>

            <div className={style.lvl}>
                <label htmlFor="password">ПАРОЛЬ</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className={style.error}>{formik.errors.password}</div>
                ) : null}
            </div>

            <div className={style.lvl2}>
                <input
                    type="radio"
                    id="notii"
                    name="isChangeII"
                    onBlur={formik.handleBlur}
                    onClick={handleButtonClick} />
                <label for="notii">Я НЕ РОБОТ/КИБОРГ/ИИ</label>
            </div>
            {formik.touched.tokenCaptcha && formik.errors.tokenCaptcha ? (
                <div className={style.error}>{formik.errors.tokenCaptcha}</div>
            ) : null}

            <InvisibleSmartCaptcha
                hideShield={true}
                sitekey={sitekey}
                key={resetCaptcha}
                onSuccess={(t) => formik.values.tokenCaptcha = t}
                onChallengeHidden={handleChallengeHidden}
                visible={visible}
                webview={true}
            />
            {/* </div> */}

            <button type="submit" className={style.button} disabled={state.isLoadingAuth}>
                {modeReg ? <p>Регистрация</p> : <p>Войти</p>}
            </button>

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
    const { setOpenAuth, stateAuth } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(true);
    const [modeReg, setModeReg] = useState(false);

    useEffect(() => {
        if (modalVisible) {
            disableScroll();
        } else {
            enableScroll();
            setOpenAuth(false)
        }
    }, [modalVisible]);

    useEffect(() => {
        return () => {
            enableScroll()
        }
    })

    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = 'auto';
    }

    return (
        <>
            {/* {modalVisible ? <></> : */}
            {/* {stateAuth.isAuthenticated == false && ( */}
            {/* <div className={style.shadow} > */}
            {/* <div className={style.skeleton}> */}
            <div className={style.main}>
                {/* <div className={style.close} onClick={() => setModalVisible(false)}>
                                <CloseEmoji />
                            </div> */}
                <div className={style.mode}>
                    <img src="./assets/main/blue-nemo-tishka.png" alt="Тишка И Немо - привет" />
                    <ChoiceMode modeReg={modeReg} setModeReg={setModeReg} />
                </div>
                <div className={style.form}>
                    <p className={style.modeP}>
                        {modeReg ? "Регистрация" : "Вход"}
                    </p>
                    <Form modeReg={modeReg} />
                </div>
            </div>
            {/* </div> */}
            {/* </div > */}
            {/* )} */}

            {/* } */}
        </>
    )
}