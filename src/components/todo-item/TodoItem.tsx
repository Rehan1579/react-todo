import "./TodoItem.scss";

export const TodoItem = (props: any) => {
    const { todo, removeTodo, toggleTodo } = props;

    return (
        <li className="todo-item">
            <label className="checkcontainer" style={{ textDecoration: todo.complete ? "line-through" : "none" }}>
                <input type="checkbox" checked={todo.complete} onChange={(e) => toggleTodo(todo.id, e.target.checked)}></input>
                {todo.title}
                <span className="checkmark"></span>
            </label>

            <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </li>
    );
};
