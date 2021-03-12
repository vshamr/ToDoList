import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todolistID: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-FILTER",
    filter: FilterValuesType,
    id: string
}
export type ChangeTodolistTitle = {
    type: "CHANGE-TITLE",
    title: string
    id: string
}

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitle


export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "ADD-TODOLIST": {
          return [...state, {id: action.todolistID, title: action.title, filter: "all"}]
        }
        case "CHANGE-FILTER": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.title}
                } else {
                    return tl
                }
            })
        }
         case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        default:
            return state
    }
}
export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistID}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title: title, todolistID: v1()}
}
export const ChangeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitle => {
    return {type: "CHANGE-TITLE", title: title, id: todolistID }
}
export const ChangeTodolistFilterAC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-FILTER", filter: filter, id: todolistID}
}