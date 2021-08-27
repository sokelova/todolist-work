import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import { Button } from "./Button";

type InputType = {
    addInfo: (title: string) => void
}
export const AllInput = (props: InputType) => {

    let[title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addInfoHandler = () => {
        props.addInfo(title.trim())
        setTitle('')
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode===13){addInfoHandler()}
    }

    return <div>
        <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
        {/*<Button />*/}
    </div>
}
