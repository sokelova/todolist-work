import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./components/Input";
import { Input } from './components/Input';
import s from "./App.module.css";

type newInfoTab={
    id: string
    title: string
    isUp: boolean
}

type propsTitle={
    title:string
    info: Array<newInfoTab>
    removeInfo: (infoId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addInfo: (title: string) => void
    changeInfoStatus: (id:string, isUp: boolean) => void
    filter: string
}

export const Todolist = (props:propsTitle)=>{

    const onAllClickHandler = () => { props.changeFilter("all");};
    const onActiveClickHandler = () => { props.changeFilter("active");};
    const onCompletedClickHandler = () => { props.changeFilter("completed");};

    return (
        <div>
            <h3>Todolister {props.title}</h3>
            <div>
                <Input addInfo={props.addInfo}/>
                <button>+</button>
            </div>
            <ul>{
                props.info.map(f => {

                    const onClickHandler = () => {props.removeInfo(f.id)}
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsUpValue = event.currentTarget.checked;
                        props.changeInfoStatus(f.id, newIsUpValue);
                    }
                    // return <li key={i.id} className={i.isDone ? s.isDone_executed : ""}>
                    return <li key={f.id}>
                        <input type="checkbox" onChange={onChangeHandler} checked={f.isUp}/>
                        <span>{f.title}</span>
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
