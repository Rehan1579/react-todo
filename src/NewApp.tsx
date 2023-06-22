import { useRef, useState } from "react";
import { TodoService } from "./services/todo-service";
import { ITodo } from "./data-models/ITodo";
import { TodoList } from "./components/todo-list/TodoList";
import { TodoForm } from "./components/todo-form/TodoForm";



export function NewApp() {

    const [todos, setTodos] = useState<ITodo[]>([]);
    
    const todoFormRef = useRef(null);



    function removeTodo(id: string) {
        
        const canDelete = confirm("Are you sure you want to remove the todo?");
        if (!canDelete)
        {
            return;
        }


        TodoService.removeTodo(id);
        refreshTodo();
    }



    function refreshTodo() {
        
        const updatedTodos = TodoService.getTodos();
        setTodos(updatedTodos);
    }



    function addTodo(payload: ITodo): void {
        
        TodoService.addTodo(payload);
        refreshTodo();
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
        
        TodoService.toggleTodo(id, completed);
        refreshTodo();
    }



    return (
        <div>
            <TodoForm saveTodo={saveTodo} ref={todoFormRef} />
            <TodoList todoItems={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
        </div>
    );
}
