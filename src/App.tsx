import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";


function App() {
//BLL
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all")


    function removeTask(taskId: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
    }

    function changeFilter(newFilerValue: FilterValuesType) {
        setFilter(newFilerValue);
    }

    function addTask(taskTitle: string) {
        setTasks([{
            id: v1(),
            title: taskTitle,
            isDone: false
        }, ...tasks])
    }

    function changeStatusTasks(taskID: string, isDone: boolean) {
        const newTasks = tasks.map( t => {
            if(t.id === taskID) {
                return {...t, isDone: isDone}
            } else {
                return t
            }
        })
        setTasks(newTasks);
    }


    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return (
        //UI
        <div className="App">
            <ToDoList title='What to learn'
                      tasks={tasksForTodolist}
                      filter={filter}
                      removeTasks={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatusTasks={changeStatusTasks}
            />

        </div>
    );
}

export default App;
