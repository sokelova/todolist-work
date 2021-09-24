import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../App.module.css";
import {Button} from "@material-ui/core";

export type FilterValuesType = "all" | "active" | "completed";

type InputType = {
    addInfo: (title:string) => void
}
export const Input = (props: InputType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null> (null);

    const addInfo = () => {
        let newTitle = title.trim();
        if(newTitle.trim() !== ""){
            props.addInfo(newTitle);
            setTitle("");
        }else{
            setError("Title not input");
        }

    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("");
        if (event.charCode===13) {addInfo();}
    };
    const errorClas = s.error_message;

    return <div>
        <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        {/*<button onClick={addInfo}>+</button>*/}
        <Button onClick={addInfo} variant="contained" style={{maxWidth:'30px', maxHeight:'20px', minWidth:'30px', minHeight:'20px'}}>
            +
        </Button>
        <div className={errorClas}>{error}</div>
    </div>
}
