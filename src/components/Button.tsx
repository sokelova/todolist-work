import React, {useState} from "react";

type PropsType ={
    addInfo: (title: string) => void
    title: string
    setTitle: (title:string) => void
}
export const Button = (props: PropsType) => {

    const addInfoHandler = () => {

        props.addInfo(props.title.trim())
        props.setTitle('')
    }

    return(
        <button onClick={addInfoHandler}>+</button>
    )
}
