import { ITodo } from "../data-models/ITodo";

const todos: ITodo[] = [
    { id: "1", title: "Task 1", complete: false },
    { id: "2", title: "Task 2", complete: false },
    { id: "3", title: "Task 3", complete: false },
];

export const TodoService = {
    getTodos: (): ITodo[] => {
        return [...todos];
    },
    
    removeTodo: (id: string) => {
        if (!id)
        {
            return;
        }

        
       const index = todos.findIndex((item) => item.id === id);
       todos.splice(index, 1);
    },

    addTodo: (payload: ITodo) => {
        if (!payload)
        {
            return;
        }

        
        payload.id = crypto.randomUUID();
        todos.push(payload);
    },

    toggleTodo: (id: string, completed:boolean) => {

        const index = todos.findIndex((item) => item.id === id);
        const item = todos[index];
        todos[index] = {
            ...item,
            complete: completed
        };
    },
};
