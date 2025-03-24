import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todoId:string, id: string) {
        setTasks({ ...tasks, [todoId]:tasks[todoId].filter(todo => todo.id !== id )})
    }

    function addTask(todoId:string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks[todoId]];
        setTasks({...tasks, [todoId]: newTasks});
    }
    function changeStatus(todoId:string, taskId: string, isDone: boolean) {
        let task = tasks[todoId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks, [todoId]: tasks[todoId]});
    }

    function changeFilter(todoId:string, value: FilterValuesType) {
        setTodolists([...todolists.map((t) => {
            return t.id === todoId ? {...t, filter: value} : {...t};
        })])
    }

    return (
        <div className="App">
            {todolists && todolists.map((todolist:todolistsType) => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks

                if (todolist.filter === "active") {
                    filteredTasks = todolistTasks.filter(t => t.isDone === false);
                }
                if (todolist.filter === "completed") {
                    filteredTasks = todolistTasks.filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={todolist.id}
                        todoId={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                    />
                )
            })}
        </div>
    );
}

export default App;
