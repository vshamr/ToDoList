import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: number) => void
    changeFilter: (value: FilterValuesType) => void
}


function Todolist(props: TodolistPropsType) {
    const tasks = props.tasks.map(t => {
        return (
            <li><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTasks(t.id)
                }}>x
                </button>
            </li>
        )
    })


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button onClick={ () => { props.changeFilter("all") }}>All</button>
                    <button onClick={ () => { props.changeFilter("active") }}>Active</button>
                    <button onClick={ () => { props.changeFilter("completed") }}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;
