import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./components/Input";
import { Input } from './components/Input';
import s from "./App.module.css";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import {AddItemForm} from "./components/addItem/AddItemForm";
import {EditableTitle} from "./components/editableSpan/EditableTitle";

export type newInfoTab={
    id: string
    title: string
    isUp: boolean
}

type PropsType={
    id: string
    title: string
    info: Array<newInfoTab>
    removeInfo: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addInfo: (title:string, todolistId: string) => void
    changeInfoStatus: (id:string, isUp: boolean, todolistId: string) => void
    changeInfoTitle: (id:string, newTitle: string, todolistId: string) => void
    changeTitleTodolist: (id:string, newTitle: string) => void
    filter: string
    updateInfo: (title:string, todolistId: string, infoId: string) => void
}

export const Todolist = (props:PropsType)=>{

    const onAllClickHandler = () => { props.changeFilter("all", props.id);};
    const onActiveClickHandler = () => { props.changeFilter("active", props.id);};
    const onCompletedClickHandler = () => { props.changeFilter("completed", props.id);};
    const removeInfoTab = () => { props.removeTodolist(props.id);}

    const callBackHandlerForAddItemForm = (title: string) => {
        props.addInfo(title, props.id)
    }
    const onChangeTitleTodolistHandler = (newValue: string) => {
        props.changeTitleTodolist(props.id, newValue);
    }

    return (
        <div>
            <h3>
                {/*Todolister {props.title}*/}
                <EditableSpan title={props.title} editMode={true} callBack={onChangeTitleTodolistHandler}/>

                <button onClick={removeInfoTab}>X</button>
            </h3>
            <AddItemForm addItem={callBackHandlerForAddItemForm} />
            {/*<div>*/}
            {/*    <Input addInfo={(title)=>props.addInfo(title, props.id)}/>*/}
            {/*</div>*/}
            <ul>{
                props.info.map(f => {

                    const onClickHandler = () => {props.removeInfo(f.id, props.id)}
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsUpValue = event.currentTarget.checked;
                        props.changeInfoStatus(f.id, newIsUpValue, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeInfoTitle(f.id, newValue, props.id);
                    }
                    return <li key={f.id}>
                        <input type="checkbox" onChange={onChangeHandler} checked={f.isUp}/>
                        <EditableSpan title={f.title} editMode={true} callBack={onChangeTitleHandler}/>
                        {/*<EditableSpan title={f.title} callBack={(title)=>props.updateInfo(title, props.id, f.id)}/>*/}
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }

            </ul>
            <div>
                <button className={props.filter === "all" ? s.active_filter : ""} onClick={ onAllClickHandler } >All</button>
                <button className={props.filter === "active" ? s.active_filter : ""} onClick={ onActiveClickHandler }>Active</button>
                <button className={props.filter === "completed" ? s.active_filter : ""} onClick={ onCompletedClickHandler }>Completed</button>
            </div>
        </div>
    )
}
