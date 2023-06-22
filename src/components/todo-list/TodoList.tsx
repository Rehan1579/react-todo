import { ITodo } from "../../data-models/ITodo";
import { TodoItem } from "../todo-item/TodoItem";
import "./TodoList.scss";

export const TodoList = (props: any) => {
    const { todoItems, removeTodo, toggleTodo } = props;

    return (
        <ul className="todo-list">
            {todoItems.length == 0 && <p className="todo-list--empty">No Todos</p>}

            {todoItems.map((item: ITodo) => {
                return <TodoItem key={item.id} todo={item} removeTodo={removeTodo} toggleTodo={toggleTodo} />;
            })}
        </ul>
    );
};
