import { useDispatch, useSelector } from "react-redux";
import { Mopik } from "../../mopik";
import style from "./style.module.scss";
import { clear, getNoteS } from "../../../store/notes/notes.slice";
import { useEffect, useState } from "react";
import { SkeletonLoading } from "../../pageNotes/skeleton";

export const ListMopiks = () => {
    const state = useSelector(state => state.noteS0);
    const dispatch = useDispatch();
    let didInit = false;

    useEffect(() => {
        if (didInit == false) {
            didInit = true;
            dispatch(getNoteS({ start: 0, count: 30 }))
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
                    getNoteS({ start: state.data.mopiks.length, count: 30 })
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
                    countView={el.society.viewUsers}
                    key={el._id}
                />
            )}
            {state.isLoading &&
                <SkeletonLoading />
            }
        </div>
    )
}