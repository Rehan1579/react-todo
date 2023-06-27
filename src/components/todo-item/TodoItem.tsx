import "./TodoItem.scss";
import { TodoContextController } from "../../data-models/context/todo-context";
import { ITodo } from "../../data-models/interfaces/ITodo";
import { useContext } from "react";


interface ITodoItemProps {
    todo: ITodo;
}


export const TodoItem = (props: ITodoItemProps) => {
    
    const { todo } = props;

    const context = TodoContextController.getContext();
    const todoContext = useContext(context);
    

    function onToggleTodo(id: string, checked: boolean) {
        todoContext.toggleTodo(id, checked);
    }


    function onRemoveTodo(id: string): void {
        todoContext.removeTodo(id);
    }


    return (
        <li className="todo-item">
            <label className="checkcontainer" style={{ textDecoration: todo.complete ? "line-through" : "none" }}>
                <input type="checkbox" checked={todo.complete} onChange={e => onToggleTodo(todo.id, e.target.checked)}></input>
                {todo.title}
                <span className="checkmark"></span>
            </label>

            <button onClick={_ => onRemoveTodo(todo.id)}>Remove</button>
        </li>
    );
};
