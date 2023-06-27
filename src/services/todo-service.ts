import { ITodo } from "../data-models/interfaces/ITodo";


const todos: ITodo[] = [
    { id: "1", title: "Task 1", complete: false },
    { id: "2", title: "Task 2", complete: false },
    { id: "3", title: "Task 3", complete: false },
];



interface ITodoService {
    getTodos(): Promise<ITodo[]>;
    removeTodo(id: string): Promise<boolean>;
    addTodo(payload: ITodo): Promise<ITodo>;
    toggleTodo(id: string, completed: boolean): Promise<boolean>;
}



export const TodoService: ITodoService = {

    getTodos: (): Promise<ITodo[]> => {

        return new Promise((resolve, _) => {
            resolve([...todos]);
        });
    },


    removeTodo: (id: string): Promise<boolean> => {

        return new Promise((resolve, _) => {

            if (!id)
            {
                resolve(false);
                return;
            }
    
            const index = todos.findIndex((item) => item.id === id);
            const arr = todos.splice(index, 1);
            resolve(arr.length > 0);
        });
    },


    addTodo: (payload: ITodo): Promise<ITodo> => {

        return new Promise((resolve, reject) => {

            if (!payload)
            {
                reject();
                return;
            }
    
            payload.id = crypto.randomUUID();
            todos.push(payload);
            resolve({...payload});
        });
    },


    toggleTodo: (id: string, completed: boolean): Promise<boolean> => {

        return new Promise((resolve, _) => {

            if (!id)
            {
                resolve(false);
                return;
            }
    
            

            const index = todos.findIndex((item) => item.id === id);
            const item = todos[index];
            todos[index] = {
                ...item,
                complete: completed,
            };
            resolve(true);
        });        
    }
};
