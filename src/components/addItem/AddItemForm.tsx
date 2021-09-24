import {Button, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../../App.module.css";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    let [title, setTitle] = useState("");
    let [error, setError] = useState (false);

    const addItem = () => {
        if(title.trim() !== ""){
            props.addItem(title);
            setTitle("");
        }else{
            setError(true);
        }

    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (event.charCode===13) {addItem();}
    };
    const errorClas = s.error_message;
    return <div>
        {/*<input*/}
        {/*    value={title}*/}
        {/*    onChange={onChangeHandler}*/}
        {/*    onKeyPress={onKeyPressHandler}*/}
        {/*    className={error ? errorClas : ""}*/}

        {/*/>*/}
        <TextField
            id="standard-basic"
            error={error}
            label={error ? "Title is required" : "Insert your text"}
            variant="standard"
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? errorClas : ""}
        />
        <Button onClick={addItem} variant="contained" style={{maxWidth:'30px', maxHeight:'20px', minWidth:'30px', minHeight:'20px'}}>
            +
        </Button>
        {error && <div className={errorClas}>{error}</div>}
    </div>
}
