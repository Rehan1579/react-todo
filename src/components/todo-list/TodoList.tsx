import { ITodo } from "../../data-models/interfaces/ITodo";
import { TodoItem } from "../todo-item/TodoItem";
import "./TodoList.scss";


interface ITodoListProps {
    todoItems?: ITodo[];
}


export const TodoList = (props: ITodoListProps) => {
    const { todoItems } = props;

    const hasTodo = todoItems && todoItems.length > 0;

    const noTodos = <p className="todo-list--empty">No Todos</p>;

    const todos = todoItems?.map((item: ITodo) => {
        return <TodoItem key={item.id} todo={item} />;
    });

    return <ul className="todo-list">{hasTodo ? todos : noTodos}</ul>;
};
