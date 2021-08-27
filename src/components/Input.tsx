import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../App.module.css";

export type FilterValuesType = "all" | "active" | "completed";

type PropsType = {
    title: string
    setTitle: (title:string) => void
    addInfo: (title:string) => void
}
export const Input = (props: PropsType) => {

    let [error, setError] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("");
        if (event.key==='Enter') {
            props.addInfo(props.title)
            props.setTitle('')
        }
    };
    const errorClas = s.error_message;

    return <div>
        <input value={props.title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        <div className={errorClas}>{error}</div>
    </div>
}
