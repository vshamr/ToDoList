import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";


function App() {
//BLL
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'React', isDone: false}
    ]);

    function removeTask(taskId: number) {
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    function changeFilter(newFilerValue: FilterValuesType) {
        setFilter(newFilerValue);
    }

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    return (
        //UI
        <div className="App">
            <ToDoList title='What to learn'
                      tasks={tasksForTodolist}
                      removeTasks={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
