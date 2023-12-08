import { Mopik } from "../../mopik";
import style from "./style.module.scss";

export const SelectMopiks = () => {
    return (
        <div className={style.select}>
            <div className={style.check}>
                <p>Коллекция</p>
                <p>Избранное</p>
            </div>
            <div className={style.list}>
                <Mopik
                    id={1}
                    title={"Как же хочется отдохнуть в Сибири"}
                    text={`Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. `}
                    countView={458}
                />
                <Mopik
                    id={2}
                    title={"Как же хочется отдохнуть в Сибири"}
                    text={`Однажды моя мама, живущая в сибирской деревне, решила уехать в город. Она собрала все свои вещи и поехала на поезде в далекий город. `}
                    countView={458}
                />
            </div>
        </div>
    )
}