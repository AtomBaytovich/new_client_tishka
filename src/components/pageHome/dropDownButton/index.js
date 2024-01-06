import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";

export const ButtonDropDown = ({ text }) => {
    return (
        <div className={`${style.button}`}>
            <p>{text}</p>
        </div>
    )
}

export const DropDownButton = ({ 
    children, 
    hidden = false, 
    text, 
    button = <ButtonDropDown text={text} />, 
    className = undefined, 
    
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (hidden) {
            document.addEventListener("click", handleClickOutside, true);

            return () => {
                document.removeEventListener("click", handleClickOutside, true);
            };
        }
    }, []);

    return (
        <div className={style.mainDrop} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {button}
            </div>
            <div className={style.dataDrop} style={isOpen ? { display: "block" } : undefined}>
                {children}
            </div>
            {/* {(isOpen ? (<div className={style.dataDrop}></div>) : (<></>))} */}
        </div>
    )
}