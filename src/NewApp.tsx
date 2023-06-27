import { useRef, useState, useEffect } from "react";
import { TodoService } from "./services/todo-service";
import { ITodo} from "./data-models/interfaces/ITodo";
import { TodoList } from "./components/todo-list/TodoList";
import { TodoForm } from "./components/todo-form/TodoForm";
import { ITodoListContext, TodoContextController } from "./data-models/context/todo-context";
import "./index.css";


export function NewApp() {

    const [todos, setTodos] = useState<ITodo[]>([]);
    const todoFormRef = useRef(null);



    const TodoListContext = TodoContextController.getContext();
    const TodoListContextValue: ITodoListContext = {
        removeTodo,
        toggleTodo
    };



    function removeTodo(id: string | null) {
        
        const canDelete = confirm("Are you sure you want to remove the todo?");
        if (!canDelete || !id)
        {
            return;
        }


        TodoService.removeTodo(id)
            .then(() => refreshTodo());
    }



    function refreshTodo() {
        TodoService.getTodos()
        .then((updatedTodos) => {
                setTodos(updatedTodos);
            });
    }



    function addTodo(payload: ITodo): void {
        
        TodoService.addTodo(payload)
            .then(() => refreshTodo());
    }



    function saveTodo(item: ITodo): void {
        
        addTodo(item);


        if(todoFormRef.current)
        {
            const form = todoFormRef.current as any;
            form.resetForm();
        }
    }



    function toggleTodo(id:string, completed:boolean) {
        
        TodoService.toggleTodo(id, completed)
            .then(() => refreshTodo());
    }


    useEffect(() => {
        (async () => {
            const todos = await TodoService.getTodos();
            setTodos(todos);
        })();
        console.log("useEffect");
    }, []);



    return (
        <div className="todo">
            <TodoListContext.Provider value={TodoListContextValue}>
                <TodoList todoItems={todos}  />
            </TodoListContext.Provider>
            <TodoForm saveTodo={saveTodo} ref={todoFormRef} />
        </div>
    );
}
