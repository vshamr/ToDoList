import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./Reducers/TL-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootState } from './Reducers/store';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>( state => state.tasks)

    function removeTask(taskId: string, todolistID: string) {
        let action = removeTaskAC(taskId, todolistID)
        dispatch(action)
    }

    function addTask(taskTitle: string, todolistID: string) {
        dispatch(addTaskAC(taskTitle, todolistID))
    }

    function changeStatusTasks(taskID: string, isDone: boolean, todolistID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    }

    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        dispatch(changeTaskTitleAC(taskID, title, todolistID))
    }

    function changeFilter(newFilerValue: FilterValuesType, todolistID: string) {
        let action = changeTodolistFilterAC(newFilerValue, todolistID);
        dispatch(action)
    }

    function removeTodolist(todolistID: string) {
        let action = removeTodolistAC(todolistID);
        dispatch(action);
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title);
        dispatch(action);
    }

    function changeTodolistTitle(title: string, todolistID: string) {
        dispatch(changeTodolistTitleAC(title, todolistID))
    }

    return (
        //UI
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let taskForTodolist = tasks[tl.id]
                            if (tl.filter === "active") {
                                taskForTodolist = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                taskForTodolist = tasks[tl.id].filter(t => t.isDone === true)
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <ToDoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodolist}
                                        filter={tl.filter}
                                        removeTasks={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatusTasks={changeStatusTasks}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }

                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
