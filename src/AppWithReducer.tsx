import React, {useReducer} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./Reducers/TL-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./Reducers/tasks-reducer";


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

function AppWithReducer() {
//BLL
    let todolistID1 = v1()
    let todolistID2 = v1()
    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to byu', filter: 'all'}
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Tea', isDone: false}
        ]
    })

    function removeTask(taskId: string, todolistID: string) {
        let action = removeTaskAC(taskId, todolistID)
        dispatchToTasks(action)
    }

    function addTask(taskTitle: string, todolistID: string) {
        dispatchToTasks(addTaskAC(taskTitle, todolistID))
    }

    function changeStatusTasks(taskID: string, isDone: boolean, todolistID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todolistID))
    }

    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todolistID))
    }

    function changeFilter(newFilerValue: FilterValuesType, todolistID: string) {
        let action = changeTodolistFilterAC(newFilerValue, todolistID);
        dispatchToTodolists(action)
    }

    function removeTodolist(todolistID: string) {
        let action = removeTodolistAC(todolistID);
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title);
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }

    function changeTodolistTitle(title: string, todolistID: string) {
        dispatchToTodolists(changeTodolistTitleAC(title, todolistID))
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

export default AppWithReducer;
