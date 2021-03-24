import {createStore, combineReducers} from 'redux';
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./TL-reducer";

export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;

