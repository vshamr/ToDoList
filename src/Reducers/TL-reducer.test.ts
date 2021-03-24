import {ActionType, addTodolistAC, removeTodolistAC, todolistReducer} from './TL-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach( () => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
} )

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todolistReducer(startState,addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action: ActionType = {
        type: 'CHANGE-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };
    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const action: ActionType = {
        type: 'CHANGE-FILTER',
        id: todolistId2,
        filter: newFilter
    };
    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



