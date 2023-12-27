import { useRef, useState } from "react";
import { PencilEmoji } from "../assets/emoji/pencil";
import style from "./style.module.scss";

export const TextareaComment = ({ backgroundColor, placeholder = "Обсудим?", icon = <PencilEmoji />, minHeight, maxHeight, onSubmit }) => {
    const inputRef = useRef(null);

    const getValue = () => {
        const value = inputRef.current.innerText;
        inputRef.current.innerText = "";
        return value;
    };

    return (
        <div className={style.main}>
            <div
                // onInput={(e) => console.log(e.currentTarget.textContent)}
                ref={inputRef}
                placeholder={placeholder}
                className={style.textareaElement}
                contentEditable={true}
                style={{ backgroundColor: backgroundColor ? backgroundColor : null, minHeight, maxHeight }}
            >
            </div>
            <div className={style.searchIcon} onClick={() => onSubmit(getValue())}>{icon}</div>
        </div>
    )
}