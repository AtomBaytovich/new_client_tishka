import style from "./style.module.scss";

export const RadioButton = ({ text, id, name, value, checked, onChange }) => {
    return (
        <label className={style.radioBtn}>
            <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} />
            <span for={id}>{text}</span>
        </label>
    )
}