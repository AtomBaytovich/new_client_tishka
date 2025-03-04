import { useDispatch, useSelector } from "react-redux";
import { Mopik } from "../../mopik";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { SkeletonLoading } from "../../pageNotes/skeleton";
import { getMopikS, clear } from "../../../store/mopiks/mopiks.slice";

export const ListMopiks = () => {
    const state = useSelector(state => state.mopikS0);
    const stateUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    let didInit = false;

    useEffect(() => {
        if (didInit == false) {
            didInit = true;
            dispatch(getMopikS({ start: 0, count: 20, date }))
        }
        return () => {
            dispatch(clear())
        }
    }, [])


    const handleScroll = () => {
        const scrollBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (scrollBottom) {
            if (state.data.remainingItems > 0 && state.isLoading == false) {
                dispatch(
                    getMopikS({ start: state.data.mopiks.length, count: 30, date })
                )
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <div className={style.list} onScroll={handleScroll}>
            {state.data.mopiks.map((el) =>
                <Mopik
                    id={el._id}
                    text={el.text}
                    key={el._id}
                    isAdm={stateUser.user?.isAdmin}
                />
            )}
            {state.isLoading &&
                <SkeletonLoading />
            }
            {state.isLoading == false && state.data.mopiks == 0 && <p className={style.noObj}>Ой... а тут ничего больше пока что не осталось</p>}
        </div>
    )
}