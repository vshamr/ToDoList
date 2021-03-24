import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./TL-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskID: string,
    todolistID: string
}

type AddTaskActionType = {
    type: "ADD-TASK",
    title: string,
    todolistID: string
}

type ChangeTaskStatusActionType = {
    type: "CHANGE-STATUS-TASK"
    taskID: string,
    isDone: boolean,
    todolistID: string
}

type ChangeTaskTitleActionType = {
    type: "CHANGE-TITLE-TASK"
    taskID: string,
    title: string,
    todolistID: string
}


export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistID];
            copyState[action.todolistID] = todolistTasks.filter(t => t.id != action.taskID);
            return copyState
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let task = {id: v1(), title: action.title, isDone: false}
            let todolistTasks = copyState[action.todolistID];
            copyState[action.todolistID] = [task, ...todolistTasks];
            return copyState
        }
        case "CHANGE-STATUS-TASK": {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistID];
            //найдем нужную таску
            let task = todolistTasks.find(t => t.id === action.taskID);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.isDone;
                //засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
            }
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }

        }
        case 'CHANGE-TITLE-TASK': {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistID];
            let task = todolistTasks.find(t => t.id === action.taskID);
            if (task) {
                task.title = action.title
            }
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS-TASK', taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE-TASK', taskID, title, todolistID}
}