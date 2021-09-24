import React, {ChangeEvent, useState} from "react";

type EditableSpanType ={
    title: string
    callBack:(title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(true)
    let [title, setTitle] = useState("")

    const activateEditMode = () =>{
        setEditMode(false)
        setTitle(props.title)
    }
    const activateViewMode = () =>{
        setEditMode(true)
        props.callBack(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>{setTitle(e.currentTarget.value)}

    return editMode
        ? <span onDoubleClick={activateEditMode}>{props.title}</span>
        : <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
}
