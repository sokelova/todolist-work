import React, {useState} from 'react';
import './App.module.css';
import {Todolist} from "./Todolist";
import {FilterValuesType} from "./components/Input";
import { v1 } from 'uuid';

function App() {

  let [infoTab, setInfoTab] = useState (
      [
        {id:v1(), title:"HTML&CSS+", isUp: true},
        {id:v1(), title:"JS+", isUp: true},
        {id:v1(), title:"React+", isUp: false},
        {id:v1(), title:"Vue", isUp: true},
        {id:v1(), title:"PHP", isUp: true},
        {id:v1(), title:"SASS", isUp: false}]
  )

  function addInfo(title: string) {
    let infoT = { id: v1(), title: title, isUp: false };
    let newInfoTab = [infoT, ...infoTab];
    setInfoTab(newInfoTab);
  }

  function removeInfo(id: string) {
    let filteredInfo = infoTab.filter(f => f.id != id);
    setInfoTab(filteredInfo);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let infoForTodolist = infoTab;

  if (filter === "active") {
    infoForTodolist = infoTab.filter(f => f.isUp === false);
  }
  if (filter === "completed") {
    infoForTodolist = infoTab.filter(f => f.isUp === true);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  const changeStatus = (id: string, isUp: boolean) => {
    let inf = infoTab.find(f => f.id === id);
    if (inf){
      inf.isUp = isUp;
      setInfoTab([...infoTab]);
    }
  }

  return (
      <div className="App">
        <Todolist title={"1"}
                  info={infoForTodolist}
                  removeInfo={removeInfo}
                  changeFilter={changeFilter}
                  addInfo={addInfo}
                  changeInfoStatus={changeStatus}
                  filter={filter}
        />
      </div>
  );
}

export default App;
