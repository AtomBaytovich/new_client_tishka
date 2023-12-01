import { useState } from "react";
import style from "./style.module.scss";


export const DropDownButton = ({ children, text }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={style.mainDrop}>
            <div className={style.button} onClick={() => setIsOpen(!isOpen)}>
                <p>{text}</p>
            </div>
            <div className={style.dataDrop} style={isOpen ? { display: "block" } : undefined}>
                {children}
            </div>
            {/* {(isOpen ? (<div className={style.dataDrop}></div>) : (<></>))} */}
        </div>
    )
}