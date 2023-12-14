import style from "./style.module.scss";

export const WriteButton = () => {
    return (

        <div className={style.fon}>
            <a href="/">
                <div className={style.written}>
                    <p>Написать</p>
                </div>
            </a>
        </div >

    )
}