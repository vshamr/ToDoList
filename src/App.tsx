import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";

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


class MenuIcon extends React.Component {
    render() {
        return null;
    }
}

function App() {
//BLL
    const todolistID1 = v1()
    const todolistID2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to byu', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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
        const todolistTask = tasks[todolistID]
        tasks[todolistID] = todolistTask.filter(t => t.id !== taskId);
        setTasks({...tasks});
    }
    function addTask(taskTitle: string, todolistID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const todolistTask = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todolistTask]
        setTasks({...tasks})
    }
    function changeStatusTasks(taskID: string, isDone: boolean, todolistID: string) {
        const todolistTasks = tasks[todolistID]
        const task: TaskType | undefined = todolistTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        const todolistTasks = tasks[todolistID]
        const task: TaskType | undefined = todolistTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeFilter(newFilerValue: FilterValuesType, todolistID: string) {
        const todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist)
            todolist.filter = newFilerValue
        setTodolists([...todolists])
    }
    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    function addTodolist(title: string) {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {
            id: newTodolistID, title: title, filter: "all"
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }
    function changeTodolistTitle(title: string, todolistID: string) {
        const todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    return (
        //UI
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
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
    )
        ;
}

export default App;
