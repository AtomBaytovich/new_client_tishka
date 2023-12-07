import style from "./style.module.scss";

export const Checkbox = ({ text }) => {
    return (
        <label class={style.checkboxBtn}>
            <input type="checkbox" />
            <span>{text}</span>
        </label>
    )
}