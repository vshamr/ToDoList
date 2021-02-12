import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTasks: (taskId: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (taskTitle: string, todolistID: string) => void
    changeStatusTasks: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}


function Todolist(props: TodolistPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)

    const all = () => {
        props.changeFilter('all', props.id)
    };
    const active = () => {
        props.changeFilter("active", props.id)
    };
    const completed = () => {
        props.changeFilter("completed", props.id)
    };

    const tasks = props.tasks.map(t => {
        const removeTasks = () => {
            props.removeTasks(t.id, props.id)
        }
        const changeStatusTasks = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusTasks(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input
                    type={"checkbox"}
                    checked={t.isDone}
                    onChange={changeStatusTasks}
                />
                <EditableSpan
                    title={t.title}
                    changeItem={changeTitle}/>
                <button onClick={removeTasks}>x</button>
            </li>
        )
    })

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} changeItem={changeTodolistTitle}/>
                    <button onClick={() => {
                        props.removeTodolist(props.id)
                    }}>x
                    </button>
                </h3>
                <AddItemForm addItem={addTask}/>
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
