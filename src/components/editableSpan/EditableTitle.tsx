import React, {ChangeEvent, useState} from "react";

type EditableTitleType ={
    title: string
    callBack:(title: string, id: string) => void
    editMode: boolean
    id: string
}

export const EditableTitle = (props: EditableTitleType) => {

    let [editMode, setEditMode] = useState(true)
    let [title, setTitle] = useState("")
    let [id, setId] = useState("")

    const activateEditMode = () =>{
        setEditMode(false)
        setTitle(props.title)
    }
    const activateViewMode = () =>{
        setEditMode(true)
        props.callBack(title, id)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value);
    }

    return editMode
        ? <span onDoubleClick={activateEditMode}>{props.title}</span>
        : <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
}
