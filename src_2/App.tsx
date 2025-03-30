import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {useState} from "react";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = { id: string, title: string }

export type TaskStateType = {
    data: TaskType[]
    filter: FilterValuesType
}


export type TasksStateType = {
    [key: string]: TaskStateType
}

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        console.log(tasks)
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks({
            ...tasks,
            [todolistId]: {
                data: [...tasks[todolistId].data.filter(el => el.id !== taskId)],
                filter: tasks[todolistId].filter
            }
        })
    }

    function addTask(todolistId: string, title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({
            ...tasks,
            [todolistId]: {
                data: [...tasks[todolistId].data, newTask],
                filter: tasks[todolistId].filter
            }
        })
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        setTasks({
            ...tasks,
            [todolistId]: {
                data: [...tasks[todolistId].data.map(
                    el => el.id === taskId
                        ? {...el, isDone: newIsDone} : el)],
                filter: tasks[todolistId].filter
            }
        })
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                filter: value
            }
        });
    }

    return (
        <div className="App">
            {todolists.map((el) => {
                // const todolist = tasks[el.id];

                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasks[el.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
