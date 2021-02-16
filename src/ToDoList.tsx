import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutlined} from "@material-ui/icons";

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
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

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
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    color="primary"
                    checked={t.isDone}
                    onChange={changeStatusTasks}
                />
                <EditableSpan title={t.title} changeItem={changeTitle}/>
                <IconButton  onClick={removeTasks}>
                    <DeleteOutlined />
                </IconButton>
            </div>
        )
    })

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} changeItem={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolist}>
                        <DeleteOutlined />
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
                    {tasks}
                </div>
                <div>
                    <Button
                        size={"small"}
                        variant={props.filter === 'all' ? "contained" : "text"}
                        onClick={all}>All
                    </Button>
                    <Button
                        size={"small"}
                        color={"primary"}
                        variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={active}>Active
                    </Button>
                    <Button
                        size={"small"}
                        color={"secondary"}
                        variant={props.filter === 'completed' ?  "contained" : "text"}
                        onClick={completed}>Completed
                    </Button>

                </div>
            </div>
        </div>

    );
}

export default Todolist;
