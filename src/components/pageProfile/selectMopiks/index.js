import { useEffect, useState } from "react";
import { Mopik } from "../../mopik";
import style from "./style.module.scss";
import { getMopikS } from "../../../api/services/mopiks";
import { SkeletonLoading } from "../../pageNotes/skeleton";

export const SelectMopiks = ({ nick }) => {
    const [typeM, setTypeM] = useState("Коллекция")
    const [state, setState] = useState({
        isLoading: true,
        isError: undefined,
        data: {}
    });
    const [date, setDate] = useState(new Date())
    let didInit = false;

    useEffect(() => {
        if (didInit == false) {
            didInit = true;
            let params = {
                start: 0, count: 15, date, nick
            }
            if (typeM == "Избранное") params.favourites = true;
            getMopikS(params)
                .then(res => {
                    // console.log(res)
                    setState({
                        isLoading: false,
                        isError: undefined,
                        data: res
                    })
                })
                .catch(err => {
                    console.log(err)
                    setState({
                        isLoading: false,
                        isError: err,
                        data: {}
                    })
                })
        }
        return () => {
            setState({
                isLoading: true,
                isError: undefined,
                data: {}
            })
        }
    }, [typeM])

    useEffect(() => {
        return () => {
            setState({
                isLoading: true,
                isError: undefined,
                data: {}
            })
        }
    }, [])


    const handleScroll = () => {
        const scrollBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (scrollBottom) {
            if (state.data.remainingItems > 0 && state.isLoading == false) {
                let params = {
                    start: state.data.mopiks.length, count: 20, date, nick
                }
                if (typeM == "Избранное") params.favourites = true;
                getMopikS(params)
                    .then(res => {
                        // console.log(res)
                        setState({
                            isLoading: false,
                            isError: undefined,
                            data: {
                                ...res,
                                mopiks: [...state.data.mopiks, ...res.mopiks],
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const oprType = (type) => {
        if (typeM == type) return;
        setState({
            isLoading: true,
            isError: undefined,
            data: {}
        })
        if (type == "Коллекция") {
            setTypeM("Коллекция")
        }

        if (type == "Избранное") {
            setTypeM("Избранное")
        }
    }

    return (
        <div className={style.select}>
            <div className={style.check}>
                <p onClick={() => oprType("Коллекция")} style={typeM === "Коллекция" ? { color: "#75BD4E" } : null}>Коллекция</p>
                <p onClick={() => oprType("Избранное")} style={typeM === "Избранное" ? { color: "#75BD4E" } : null}>Избранное</p>
            </div>
            <div className={style.list}>
                {state.isLoading && <SkeletonLoading />}
                {state.isLoading == false && state.data.mopiks.map((el) =>
                    <Mopik
                        id={el._id}
                        text={el.text}
                        key={el._id}
                    />
                )}
                {(state.isLoading == false && state.data.mopiks.length == 0) && <p className={style.notObj}>Пока тут нет ничего</p>}
            </div>
        </div>
    )
}