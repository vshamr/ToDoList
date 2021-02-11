import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTasks: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskTitle: string) => void
    changeStatusTasks: (taskID: string, isDone: boolean) => void
}


function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null)
    const all = () => {
        props.changeFilter('all')
    };
    const active = () => {
        props.changeFilter("active")
    };
    const completed = () => {
        props.changeFilter("completed")
    };
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }


    const tasks = props.tasks.map(t => {
        const removeTasks = () => {
            props.removeTasks(t.id)
        }
        const changeStatusTasks = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusTasks(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input
                    type={"checkbox"}
                    checked={t.isDone}
                    onChange={changeStatusTasks}
                />
                <span>{t.title}</span>
                <button onClick={removeTasks}>x</button>
            </li>
        )
    })

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title}
                        onChange={changeTitle}
                        onKeyPress={onKeyPressAddTask}
                        className={error ? "error" : ""}
                        onBlur={() => {setError(null)}}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? "active-filter" : ""} onClick={all}> All
                    </button>
                    <button
                        className={props.filter === 'active' ? "active-filter" : ""} onClick={active}> Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? "active-filter" : ""} onClick={completed}> Completed
                    </button>

                </div>
            </div>
        </div>

    );
}

export default Todolist;
