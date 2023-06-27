import { createContext } from "react";



export interface ITodoListContextValue {
    Provider?: React.Provider<ITodoListContextValue>;
    removeTodo(id: string): void;
    toggleTodo(id: string, completed: boolean): void;
}



export const TodoContextController = (() => {

    let context: React.Context<ITodoListContextValue> | undefined;



    function initializeContext() {
        return createContext(undefined);
    }



    function getContext() {

        if (!context)
        {
            context = initializeContext();
        }
        return context;
    }


    return {
        getContext,
    };
})();
