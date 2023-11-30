import { useState } from "react";
import style from "./style.module.scss";


export const DropDownButton = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={style.mainDrop}>
            <div className={style.button} onClick={() => setIsOpen(!isOpen)}>
                <p>Важные правила</p>
            </div>
            <div className={style.dataDrop} style={isOpen ? { display: "block" } : undefined}>
                {children}
            </div>
            {/* {(isOpen ? (<div className={style.dataDrop}></div>) : (<></>))} */}
        </div>
    )
}