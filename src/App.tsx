import React, {useState} from 'react';
import './App.module.css';
import {newInfoTab, Todolist} from "./Todolist";
import {FilterValuesType, Input} from "./components/Input";
import { v1 } from 'uuid';
import {AddItemForm} from "./components/addItem/AddItemForm";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<newInfoTab>
}
function App() {

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        setTodolists([ ...todolists, {id: newTodolistId, title: title, filter: "all"}])
        setInfoTab({
            ...infoTab,
            [newTodolistId]: []
        })
    }

    function addInfo(title:string,  todolistId: string) {
        let infoT = { id: v1(), title: title, isUp: false };
        let todolistInfo = infoTab[todolistId];
        infoTab[todolistId] = [infoT, ...todolistInfo];
        setInfoTab({...infoTab});
    }

    function removeInfo(id: string, todolistId: string) {
        let tasks = infoTab[todolistId];
        infoTab[todolistId] = tasks.filter(f => f.id != id);
        setInfoTab({...infoTab});
    }

    function removeTodolist(todolistId: string) {
        let delTodolist = todolists.filter(t => t.id != todolistId);
        setTodolists(delTodolist);
        delete infoTab[todolistId];
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let inf = todolists.find(t => t.id == todolistId);
        if (inf){
            inf.filter = value;
            setTodolists([...todolists]);
        }
    }

    const changeStatus = (id: string, isUp: boolean, todolistId: string) => {
        let tasks = infoTab[todolistId];
        let inf = tasks.find(f => f.id === id);
        if (inf){
            inf.isUp = isUp;
            setInfoTab({...infoTab});
        }
    }

    const changeTitle = (id: string, newTitle: string, todolistId: string) => {
        let tasks = infoTab[todolistId];
        let task = tasks.find(t => t.id === id);
        if (task){
            task.title = newTitle;
            setInfoTab({...infoTab});
        }
    }
    const updateInfo = (title:string, todolistId: string, infoId: string) => {
        setInfoTab({...infoTab, [todolistId]: infoTab[todolistId].map(m => m.id === infoId ? {...m, title} : m)})
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] =  useState<Array<TodolistType>>( [
        {id: todolistId1, title:"What to learn", filter: 'all'},
        {id: todolistId2, title:"What to bye", filter: 'active'}
    ])

    let [infoTab, setInfoTab] = useState<TaskStateType>({
        [todolistId1]:[
            { id: v1(), title: "HTML&CSS", isUp: true },
            { id: v1(), title: "JS", isUp: true },
            { id: v1(), title: "ReactJS", isUp: false },
            { id: v1(), title: "Rest API", isUp: false },
            { id: v1(), title: "GraphQL", isUp: false }
        ],
        [todolistId2]:[
            { id: v1(), title: "Book", isUp: true },
            { id: v1(), title: "Fox", isUp: true }
        ]
     })
    return (
        <div className="App">
            {/*<AddItemForm addItem={addTodolist}/>*/}
            <Input addInfo={addTodolist}/>
            {todolists.map((tl) => {

                let allTodolistTasks = infoTab[tl.id];
                let infoForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                    infoForTodolist = allTodolistTasks.filter(t => !t.isUp);
                }
                if (tl.filter === "completed") {
                    infoForTodolist = allTodolistTasks.filter(t => t.isUp);
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    info={infoForTodolist}
                    removeInfo={removeInfo}
                    changeFilter={changeFilter}
                    addInfo={addInfo}
                    changeInfoStatus={changeStatus}
                    changeInfoTitle={changeTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateInfo={updateInfo}
                />
            })
            }
        </div>
    );
}

export default App;
